"use client";

import { upgradeAnonymousToGoogle } from "../../../firebase/auth";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function Login() {
  return (
    <div className="ml-auto w-auto">
      <GoogleLoginButton onClick={upgradeAnonymousToGoogle} />
    </div>
  );
}
