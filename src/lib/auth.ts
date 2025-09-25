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
    throw new Error('Failed to verify JAL Pilot ID')
  }
}
