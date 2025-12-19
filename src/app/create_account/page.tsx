'use client';
import UserForms from '@/src/app/ui/user_forms'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreateNewAccount() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {  
      e.preventDefault()

      const formData = new FormData(e.currentTarget);
      const formJsonData = { first_name: formData.get('first_name'), 
                             last_name: formData.get('last_name'),
                             email: formData.get('email'), 
                             password: formData.get('password'),
                             confirmPassword: formData.get('confirmPassword')
      };

      try {
        const response = await fetch('/api/users/create_account', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formJsonData)
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error in from validation.")
          return;
        }

        // "success" or whatever you returned
        // You can:
        // - Redirect the user
        // - Show a success message
        // - Clear the form
        // Example: 
        // setSuccess(true); 
      router.push('/echo');

      } catch (err: any) {
          setError("Network Error. Please try again.");
      }
    }

    return (
        <div>
            <UserForms>        
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                  alt="Echo"
                  width={25}
                  height={25}
                  src="/megaphoneBackgroundRemoved.png"
                  className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">Create a new account</h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} method="POST" className="space-y-6">
                  
                  <div>
                    <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-100">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-100">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        required
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                        Password
                      </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                        Confirm Password
                      </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                  {error && <div className="mt-2 text-center text-red-500 ">{error}</div>}
                </div>  
            </UserForms>
        </div>
    );
}