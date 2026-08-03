import { NextRequest, NextResponse } from "next/server";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/verify-email",
  "/verify-otp",
];

const userRoutes = [
  "/profile",
  "/booking-history",
  "/transaction-history",
];

const adminRoutes = ["/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("userRole")?.value;

  const isLoggedIn = !!token;

  // Redirect admin users away from home page to dashboard
  if (isLoggedIn && role === "admin" && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Prevent logged-in users from visiting auth pages
  if (isLoggedIn && authRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect user routes
  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/booking-history/:path*",
    "/transaction-history/:path*",

    "/dashboard/:path*",

    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
    "/verify-otp",
  ],
};