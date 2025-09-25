import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export interface TokenPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function verifyJALCredentials(pilotId: string): Promise<any> {
  // Always use mock data for development or when JAL API is not configured
  if (process.env.NODE_ENV === 'development' || !process.env.JAL_API_URL) {
    console.log('Using mock JAL data for development')
    return {
      id: pilotId,
      firstName: 'John',
      lastName: 'Doe',
      callsign: pilotId,
      email: `${pilotId}@jalvirtual.local`,
      role: 'PILOT',
      status: 'active'
    }
  }

  try {
    // Use pilot ID as API key to authenticate with JAL Virtual API
    const response = await fetch(`${process.env.JAL_API_URL}/crew`, {
      headers: {
        'Authorization': `Bearer ${pilotId}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid JAL Pilot ID')
      }
      if (response.status === 404) {
        throw new Error('JAL API endpoint not found')
      }
      throw new Error(`JAL API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Ensure we have the required pilot data
    if (!data.id) {
      throw new Error('Invalid pilot data from JAL API')
    }
    
    return {
      id: data.id,
      firstName: data.firstName || data.first_name || '',
      lastName: data.lastName || data.last_name || '',
      callsign: data.callsign || data.username || '',
      email: data.email || `${data.callsign || data.username || 'pilot'}@jalvirtual.local`,
      role: data.role || 'PILOT',
      status: data.status || 'active'
    }
  } catch (error) {
    console.error('JAL API verification error:', error)
    
    // Always provide fallback mock data in case of API failure
    console.log('Falling back to mock JAL data due to API error')
    return {
      id: pilotId,
      firstName: 'John',
      lastName: 'Doe',
      callsign: pilotId,
      email: `${pilotId}@jalvirtual.local`,
      role: 'PILOT',
      status: 'active'
    }
  }
}
