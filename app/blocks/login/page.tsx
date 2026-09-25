import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { LoginDemo } from "./demo"

const description =
  "The Multiple Users welcome window: a keyboard-navigable user list, a password field for the selected user and a default Log In button."

export const metadata: Metadata = {
  title: "Login",
  description,
}

export default function LoginPage() {
  return (
    <BlockDocLayout
      name="login"
      title="Login"
      description={description}
      exportName="LoginBlock"
    >
      <LoginDemo />
    </BlockDocLayout>
  )
}
