import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const flights = await prisma.flight.findMany({
      where: type ? { type: type as 'DEPARTURE' | 'ARRIVAL' } : {},
      orderBy: { departureTime: 'asc' }
    })

    return NextResponse.json({ flights })

  } catch (error) {
    console.error('Error fetching flights:', error)
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 })
  }
}
