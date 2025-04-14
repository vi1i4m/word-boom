'use client';

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      
      if (res && res.user) {
        sessionStorage.setItem("user", JSON.stringify(true));
        console.log("Signed in:", res.user);
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        console.warn("Sign-in failed: no user returned.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-400 p-4">
      <Image src={"/word-boom-logo.png"} alt="Word-Boom! logo" height={100} width={300}/>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 text-zinc-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 text-zinc-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-bold cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't have an account? <a href="/sign-up" className="text-orange-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
