import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log({username, password})
  let response = NextResponse.next()
  response.cookies.set('authSessionToken', '')
  return response
}
