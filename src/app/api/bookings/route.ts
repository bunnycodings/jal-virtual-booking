import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    let bookings
    if (payload.role === 'ADMIN') {
      // Admin can see all bookings
      bookings = await prisma.booking.findMany({
        include: {
          event: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              callsign: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      // Pilots can only see their own bookings
      bookings = await prisma.booking.findMany({
        where: { userId: payload.userId },
        include: {
          event: true
        },
        orderBy: { createdAt: 'desc' }
      })
    }

    return NextResponse.json({ bookings })

  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}