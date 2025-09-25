import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id
    const { searchParams } = new URL(request.url)
    const slotType = searchParams.get('type')
    const search = searchParams.get('search')

    // Get event bookings as slots
    const bookings = await prisma.booking.findMany({
      where: {
        eventId: eventId,
        ...(slotType && slotType !== 'all' && { slotType: slotType.toUpperCase() }),
        ...(search && {
          OR: [
            { callsign: { contains: search, mode: 'insensitive' } },
            { aircraft: { contains: search, mode: 'insensitive' } }
          ]
        })
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            callsign: true
          }
        },
        event: {
          select: {
            title: true,
            departure: true,
            arrival: true,
            startTime: true,
            endTime: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Transform bookings to slots format
    const slots = bookings.map(booking => ({
      id: booking.id,
      flightNumber: booking.callsign,
      airline: 'JAL', // Default airline
      aircraftType: booking.aircraft,
      departure: booking.event.departure,
      arrival: booking.event.arrival,
      departureTime: booking.event.startTime,
      arrivalTime: booking.event.endTime,
      gate: booking.gate || null,
      terminal: booking.terminal || null,
      status: booking.status.toLowerCase() as 'available' | 'booked' | 'delayed',
      slotType: booking.slotType?.toLowerCase() as 'departure' | 'landing' | 'private' || 'departure',
      user: booking.user,
      notes: booking.notes
    }))

    return NextResponse.json(slots)

  } catch (error) {
    console.error('Slots fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
