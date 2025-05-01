"use client"
import { SignInButton, SignedOut, SignedIn, SignOutButton } from "@clerk/nextjs";

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default MainPage;