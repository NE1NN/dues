'use client';

import { upgradeAnonymousToGoogle } from '../../../firebase/auth';

export default function Login() {
  return (
    <button onClick={upgradeAnonymousToGoogle} className="ml-auto">
      Login
    </button>
  );
}
