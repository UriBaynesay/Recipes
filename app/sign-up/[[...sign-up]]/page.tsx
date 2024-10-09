import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up",
}

const SignUpPage = () => {
  return (
    <main className="h-dvh flex justify-center items-center h-full">
      <SignUp signInUrl="/sign-in" />
    </main>
  )
}

export default SignUpPage
