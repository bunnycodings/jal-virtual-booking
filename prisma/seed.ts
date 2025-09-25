import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jalvirtual.com' },
    update: {},
    create: {
      email: 'admin@jalvirtual.com',
      password: await hashPassword('admin123'),
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User'
    }
  })

  // Create sample events
  const event1 = await prisma.event.upsert({
    where: { id: 'event-1' },
    update: {},
    create: {
      id: 'event-1',
      title: 'Tokyo to Osaka Express',
      description: 'A scenic flight from Tokyo Haneda to Osaka Itami Airport',
      date: new Date('2024-12-15'),
      startTime: '09:00',
      endTime: '11:00',
      departure: 'RJTT',
      arrival: 'RJOO',
      aircraft: 'Boeing 737-800',
      maxSlots: 50,
      adminId: admin.id
    }
  })

  const event2 = await prisma.event.upsert({
    where: { id: 'event-2' },
    update: {},
    create: {
      id: 'event-2',
      title: 'International Route',
      description: 'Long-haul flight from Tokyo to Los Angeles',
      date: new Date('2024-12-20'),
      startTime: '14:00',
      endTime: '18:00',
      departure: 'RJTT',
      arrival: 'KLAX',
      aircraft: 'Boeing 777-300ER',
      maxSlots: 30,
      adminId: admin.id
    }
  })

  // Create sample flights
  const flights = [
    {
      flightNumber: 'JL001',
      departure: 'RJTT',
      arrival: 'RJOO',
      departureTime: new Date('2024-12-15T09:00:00'),
      arrivalTime: new Date('2024-12-15T11:00:00'),
      aircraft: 'Boeing 737-800',
      type: 'DEPARTURE' as const
    },
    {
      flightNumber: 'JL002',
      departure: 'RJOO',
      arrival: 'RJTT',
      departureTime: new Date('2024-12-15T12:00:00'),
      arrivalTime: new Date('2024-12-15T14:00:00'),
      aircraft: 'Boeing 737-800',
      type: 'ARRIVAL' as const
    },
    {
      flightNumber: 'JL101',
      departure: 'RJTT',
      arrival: 'KLAX',
      departureTime: new Date('2024-12-20T14:00:00'),
      arrivalTime: new Date('2024-12-20T18:00:00'),
      aircraft: 'Boeing 777-300ER',
      type: 'DEPARTURE' as const
    }
  ]

  for (const flight of flights) {
    await prisma.flight.upsert({
      where: { flightNumber: flight.flightNumber },
      update: {},
      create: flight
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
