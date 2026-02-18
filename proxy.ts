import NextAuth from "next-auth" // bu yerda NextAuth ni import qilamiz, bu Next.js uchun auth qilish uchun ishlatiladi
import authConfig from "@/auth.config" // bu yerda authConfig ni import qilamiz, bu auth qilish uchun kerakli konfiguratsiyalarni o'z ichiga oladi
import { apiAuthPrefix, AuthRoutes, DEFAULT_LOGIN_REDIRECT, PublicRoutes } from "./routes"
 
const { auth } = NextAuth({ ...authConfig }) // bu yerda NextAuth ni chaqiramiz va authConfig ni unga uzatamiz, bu bizga auth qilish uchun kerakli funksiyalarni beradi

export const proxy = auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth;
  console.log("Proxy Middleware - Next URL:", nextUrl);  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log("Proxy Middleware - API Auth Route:", nextUrl.pathname);
    return null;  // API auth routes are always accessible
}
 
if (isAuthRoute) {
  if (isLoggedIn) {
   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); 
  }
  return null; // Auth routes are accessible to unauthenticated users
}
});


// Optionally, don't invoke Proxy on some paths
export const config = {
   matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)',
    ],}

// bu ko`rsatilgan yani static fayllar va public pathlarni auth qilmaydi. va faqatgina ko`rsatilgan pathlarnigina auth qiladi
// bu seniorlar ishlatadigan matcher bo`lib, bu yerda regex ishlatilgan va bu regex static fayllarni va public pathlarni auth qilmaydi, faqatgina ko`rsatilgan pathlarnigina auth qiladi.
