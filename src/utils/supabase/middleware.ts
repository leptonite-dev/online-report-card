import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "../../types/database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  if (!user && request.nextUrl.pathname.includes("/dashboard")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id);

    const profile = data![0];

    if (request.nextUrl.pathname === "/") {
      url.pathname = `/${profile.acc_role}`;
      return NextResponse.redirect(url);
    } else if (
      request.nextUrl.pathname.startsWith("/admin") &&
      profile.acc_role === "teacher"
    ) {
      url.pathname = `/teacher`;
      return NextResponse.redirect(url);
    } else if (
      request.nextUrl.pathname.startsWith("/teacher") &&
      profile.acc_role === "admin"
    ) {
      url.pathname = `/admin`;
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
