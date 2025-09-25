import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        bookings: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                callsign: true
              }
            }
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Calculate available slots
    const bookedSlots = event.bookings.length
    const availableSlots = event.maxSlots - bookedSlots

    const eventData = {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      startTime: event.startTime,
      endTime: event.endTime,
      departure: event.departure,
      arrival: event.arrival,
      aircraft: event.aircraft,
      maxSlots: event.maxSlots,
      bookedSlots,
      availableSlots,
      pilotBriefing: event.pilotBriefing,
      atcBriefing: event.atcBriefing,
      sceneries: event.sceneries ? JSON.parse(event.sceneries) : [],
      bookings: event.bookings.map(booking => ({
        id: booking.id,
        callsign: booking.callsign,
        aircraft: booking.aircraft,
        status: booking.status,
        user: booking.user
      }))
    }

    return NextResponse.json(eventData)

  } catch (error) {
    console.error('Event fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id
    const body = await request.json()

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        departure: body.departure,
        arrival: body.arrival,
        aircraft: body.aircraft,
        maxSlots: body.maxSlots,
        pilotBriefing: body.pilotBriefing,
        atcBriefing: body.atcBriefing,
        sceneries: body.sceneries ? JSON.stringify(body.sceneries) : null
      }
    })

    return NextResponse.json(updatedEvent)

  } catch (error) {
    console.error('Event update error:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id

    await prisma.event.delete({
      where: { id: eventId }
    })

    return NextResponse.json({ message: 'Event deleted successfully' })

  } catch (error) {
    console.error('Event delete error:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}