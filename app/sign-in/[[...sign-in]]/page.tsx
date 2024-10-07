import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
}

const SignInPage = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <SignIn signUpUrl="/sign-up"/>
    </div>
  )
}

export default SignInPage
