import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { cookies } from 'next/headers'


const font = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center 
    bg-radial from-sky-400 to-blue-800 
    bg-top">
      <div className="space-y-6 text-center">
        <h1 className={ cn("text-8xl font-semibold text-white drop-shadow-md",
           font.className)}>
            🔐 Auth
        </h1>    
        <p className="text-lg text-white drop-shadow-md">
          Welcome to the Auth application! Please sign in to continue.
        </p>
        <div>
          <LoginButton>
          <Button variant="secondary" className="text-lg">
             Sign in
          </Button>
          </LoginButton>
        </div>
      </div>

    </main>
  );
};

