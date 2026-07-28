import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'darkmatter'

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

async function getDb() {
  const c = await clientPromise
  return c.db(dbName)
}

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export async function GET(request, { params }) {
  try {
    const path = params?.path?.join('/') || ''
    if (path === '' || path === 'health') {
      return cors(NextResponse.json({ status: 'ok', service: 'The Dark Matter API', time: new Date().toISOString() }))
    }
    if (path === 'contacts') {
      const db = await getDb()
      const items = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      return cors(NextResponse.json({ items }))
    }
    if (path === 'applications') {
      const db = await getDb()
      const items = await db.collection('applications').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      return cors(NextResponse.json({ items }))
    }
    return cors(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (e) {
    return cors(NextResponse.json({ error: e.message }, { status: 500 }))
  }
}

export async function POST(request, { params }) {
  try {
    const path = params?.path?.join('/') || ''
    const body = await request.json().catch(() => ({}))
    const db = await getDb()

    if (path === 'contact') {
      const { name, email, phone, company, projectType, budget, message } = body
      if (!name || !email || !message) {
        return cors(NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        name, email, phone: phone || '', company: company || '',
        projectType: projectType || '', budget: budget || '',
        message,
        createdAt: new Date().toISOString(),
      }
      await db.collection('contacts').insertOne(doc)
      return cors(NextResponse.json({ success: true, id: doc.id, message: 'Your inquiry has been received. We\u2019ll be in touch shortly.' }))
    }

    if (path === 'apply') {
      const { name, email, phone, position, experience, portfolio, message } = body
      if (!name || !email || !position) {
        return cors(NextResponse.json({ error: 'Name, email, and position are required.' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        name, email, phone: phone || '',
        position, experience: experience || '',
        portfolio: portfolio || '', message: message || '',
        createdAt: new Date().toISOString(),
      }
      await db.collection('applications').insertOne(doc)
      return cors(NextResponse.json({ success: true, id: doc.id, message: 'Application submitted successfully. Our team will review it soon.' }))
    }

    return cors(NextResponse.json({ error: 'Endpoint not found' }, { status: 404 }))
  } catch (e) {
    return cors(NextResponse.json({ error: e.message }, { status: 500 }))
  }
}
