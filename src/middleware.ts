import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'localhost:3000',
  'https://manga-app-mou-prd.vercel.app/',
]

export default function middleware(req: NextRequest, res: NextResponse) {
  const allowed_hosts = ALLOWED_ORIGINS.map((host) => {
    return `${host}`;
  });
  const origin = req?.headers.get('Origin');

  const isPreflight = req.method === 'OPTIONS';
  if (origin) {
    const isallowed = allowed_hosts.includes(origin);
    if(isallowed) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      if (isPreflight){
        res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        res.headers.set('Access-Control-Max-Age', '86400');
      } else {
        NextResponse.next();
      } 
    } 
  }

  return NextResponse.next();
}
