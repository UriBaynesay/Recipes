import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up",
}

const SignUpPage = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <SignUp signInUrl="/sign-in"/>
    </div>
  )
}

export default SignUpPage
