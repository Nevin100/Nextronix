"use client"
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto items-center flex justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* LOGO  */}
          <div className="p-1 bg-primary/10 rounded">
            <ZapIcon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono">
            Next<span className="text-primary">ronix.</span>ai
          </span>

        </Link>
          {/* NavItems  */}
          <nav className="items-center justify-between flex gap-5">
            {isSignedIn ? (
              <>
                <Link href={"/"} className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                  <HomeIcon size={16} />
                  <span>Home</span>
                </Link>

                <Link href={"/generate-program"} className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                  <DumbbellIcon size={16} />
                  <span>Generate</span>
                </Link>

                <Link href={"/generate-program"} className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                  <UserIcon size={16} />
                  <span>Profile</span>
                </Link>

                <Button asChild
                  variant="outline"
                className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10">
                  <Link href={"/generate-program"}>Get Started</Link>
              </Button>
              
              <UserButton/>
              </>
                
            ) : (
              <>
                  <SignInButton>
                    <Button className="border-primary/50 text-primary hover:text-white hover:bg-primary/10" variant = "outline">
                      Sign In
                    </Button>
                </SignInButton>

                  <SignUpButton>
                    <Button className="ml-2 bg-primary text-white hover:bg-primary/80" variant = "outline">
                      Sign Up
                    </Button>
                  </SignUpButton>
              </>
            )}
          </nav>
     </div>
    </header>
  )
}

export default Navbar