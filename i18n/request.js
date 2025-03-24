import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n/routing';
import { NextResponse } from 'next/server';

export default function middleware(request) {
    console.log("Middleware request url", request.url);
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: '/:path*',
};