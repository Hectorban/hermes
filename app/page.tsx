import { cookies } from 'next/headers';
import { fetchApiGET } from '@/lib/api';

async function getUserData(token: string) {
  const headers = {'Authorization': token}
  const response = await fetchApiGET('/me', headers)
  return await response.json()
}

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('user');
  const user = await getUserData(token.value)
  console.log(user)
  return (
    <p>A</p>
  )
}
