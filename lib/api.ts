const url = process.env.NEXT_PUBLIC_API_URL

export async function fetchApiGET(endpoint: string, headers: any) {
  return await fetch(`${url}${endpoint}`, {
    method: 'GET',
    headers: headers
  })
}

export async function fetchApiPOST(endpoint:string, body: string, headers: HeadersInit | undefined) {
  return await fetch(`${url}${endpoint}`, {
    method: 'POST',
    body,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
}
