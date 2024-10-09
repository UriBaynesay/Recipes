import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
}

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center h-full">
      <SignIn signUpUrl="/sign-up" />
    </main>
  )
}

export default SignInPage
