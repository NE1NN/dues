"use client";

import { useState, useEffect } from 'react';
import { upgradeAnonymousToGoogle } from '../../../firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';

export default function Login() {
  const [loginState, setLoginState] = useState<boolean>(false);
  

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setLoginState(true);
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    setLoginState(false);
  };

  
  return (
    <div>
      { loginState ?  (
        <button onClick={handleLogout} className="px-4 py-2 border flex gap-2 bg-white text-green-900 border-green-900 rounded-lg hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow transition duration-150">
          <span className="text-sm">Logout</span>
      </button>
      )
      :
      (<div className="flex items-center justify-center dark:bg-green-900">
          <button onClick={upgradeAnonymousToGoogle} className="px-4 py-2 border flex gap-2 bg-white text-green-900 border-green-900 rounded-lg hover:border-green-900 hover:bg-green-900 hover:text-white hover:shadow transition duration-150">
              <Image 
                // className="w-6 h-6" 
                width={20}
                height={20}
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                loading="lazy" 
                alt="google logo"
              />
              <span className="text-sm">Login with Google</span>
          </button>
        </div>
      )}
    </div>
  );
}
