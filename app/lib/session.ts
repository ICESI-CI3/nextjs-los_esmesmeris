
import 'server-only'

import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '@/app/lib/definitions';
import { cookies } from 'next/headers';
 
export async function createSession(token:any) {
  //Expires in 7 days (we add a number in ml)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session =   token;
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

}
