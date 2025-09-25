import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    // Map frontend type values to Prisma enum values
    let flightType: 'DEPARTURE' | 'ARRIVAL' | undefined
    if (type === 'DEPARTURES') {
      flightType = 'DEPARTURE'
    } else if (type === 'ARRIVALS') {
      flightType = 'ARRIVAL'
    } else if (type === 'DEPARTURE' || type === 'ARRIVAL') {
      flightType = type as 'DEPARTURE' | 'ARRIVAL'
    }

    const flights = await prisma.flight.findMany({
      where: flightType ? { type: flightType } : {},
      orderBy: { departureTime: 'asc' }
    })

    return NextResponse.json({ flights })

  } catch (error) {
    console.error('Error fetching flights:', error)
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 })
  }
}
