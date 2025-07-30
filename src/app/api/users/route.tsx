import { connectDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

// Simple user schema for MongoDB
interface UserData {
  id: string
  name: string
  email: string
  createdAt: Date
}

export async function POST(req: Request) {
  try {
    const { id, name, email } = await req.json()
    
    if (!id || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const mongoose = await connectDB()
    
    if (!mongoose.connection.db) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
    // Check if user already exists
    const existingUser = await mongoose.connection.db.collection('users').findOne({ id })
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 200 }
      )
    }

    // Create new user
    const userData: UserData = {
      id,
      name,
      email,
      createdAt: new Date()
    }

    await mongoose.connection.db.collection('users').insertOne(userData)

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const mongoose = await connectDB()
    
    if (!mongoose.connection.db) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
    const user = await mongoose.connection.db.collection('users').findOne({ email })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)

  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 