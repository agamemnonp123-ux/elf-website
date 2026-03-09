import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // If user is trying to access portal routes
    if (request.nextUrl.pathname.startsWith('/client') || request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Role-based protection
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // Admin check: either role is admin or specific email
        const isAdmin = profile?.role === 'admin' || user.email === 'admin@elfevents.et';

        if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
            return NextResponse.redirect(new URL('/client/dashboard', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/client') && isAdmin) {
            // Optional: Redirect admin to admin dashboard if they try to access client portal
            // return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    // If logged in user tries to visit login/signup, redirect to dashboard
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const dest = profile?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
        return NextResponse.redirect(new URL(dest, request.url));
    }

    return response;
}
