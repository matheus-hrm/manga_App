import { NextResponse, type NextRequest  } from 'next/server';


export default function Middleware(request: NextRequest) {

  const origin:string | null = request.headers.get('origin');
  const res = NextResponse.next();

  res.headers.append('Access-Control-Allow-Origin', origin ?? '*');
  res.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;

}

export const config = {
  matcher:['/app/:path*']
}