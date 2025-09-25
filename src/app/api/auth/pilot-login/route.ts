import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, verifyJALCredentials } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { pilotId } = await request.json()

    if (!pilotId) {
      return NextResponse.json({ error: 'JAL Pilot ID is required' }, { status: 400 })
    }

    // Verify JAL Virtual API credentials using pilot ID as API key
    const jalData = await verifyJALCredentials(pilotId)
    
    // Check if user exists by JAL ID
    let user = await prisma.user.findUnique({
      where: { jalId: jalData.id?.toString() }
    })

    if (!user) {
      // Create new user with data from JAL API
      user = await prisma.user.create({
        data: {
          email: jalData.email,
          password: '', // Empty password for pilots using JAL ID login
          role: jalData.role || 'PILOT',
          jalId: jalData.id?.toString(),
          firstName: jalData.firstName,
          lastName: jalData.lastName,
          callsign: jalData.callsign
        }
      })
    } else {
      // Update JAL data for existing user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: jalData.firstName,
          lastName: jalData.lastName,
          callsign: jalData.callsign,
          email: jalData.email // Update email in case it changed
        }
      })
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ 
      token,
      pilotId: pilotId, // Save pilot ID to local state
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        callsign: user.callsign,
        jalId: user.jalId
      }
    })

  } catch (error) {
    console.error('Pilot login error:', error)
    
    // Provide user-friendly error messages
    let errorMessage = 'Invalid JAL Pilot ID'
    if (error instanceof Error) {
      if (error.message.includes('Invalid JAL Pilot ID')) {
        errorMessage = 'Invalid JAL Pilot ID. Please check your credentials.'
      } else if (error.message.includes('JAL API')) {
        errorMessage = 'Unable to verify pilot credentials. Please try again.'
      } else {
        errorMessage = 'Login failed. Please try again.'
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage
    }, { status: 401 })
  }
}
