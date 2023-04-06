import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

const redis = createClient();
const prisma = new PrismaClient()

export async function POST(req: Request) {
  await redis.connect();
  const { username, password } = await req.json();
  const result = await prisma.$queryRaw(Prisma.sql`
    SELECT id, username, email, avatar_url, created_at, is_admin
    FROM users 
    WHERE username = ${username} 
    AND crypt(${password}, password_hash) = password_hash;
  `);
   if (result.length > 0) {
    const token = `${username}:${uuidv4()}`
    const expireHours = 12
    await redis.set(token, JSON.stringify(result));
    await redis.expire(token, expireHours * 60 * 60)
    await redis.disconnect()
    return NextResponse.json({ 
      result: true, 
      token 
    })
   } else {
    return NextResponse.json({
      result: false, 
      error: 'Password does not match'
    }, {
        status: 403
    })
   }
}
