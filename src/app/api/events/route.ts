import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      where: { isActive: true },
      include: {
        bookings: true,
        admin: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { date: 'asc' }
    })

    return NextResponse.json({ events })

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      departure,
      arrival,
      aircraft,
      maxSlots
    } = await request.json()

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        startTime,
        endTime,
        departure,
        arrival,
        aircraft,
        maxSlots: parseInt(maxSlots),
        adminId: payload.userId
      }
    })

    return NextResponse.json({ event })

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
