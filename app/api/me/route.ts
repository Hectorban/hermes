import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const redis = createClient();

export async function GET(req: Request) {
  await redis.connect()
  const token = req.headers.get('Authorization')
  const user = await redis.get(token)
  await redis.disconnect()
  if(!user) {return NextResponse.json({result: false}, {status: 401})}
  const parsedUser = JSON.parse(user)
  return NextResponse.json(parsedUser[0])
}
