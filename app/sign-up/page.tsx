'use client';

import { useState } from "react";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; 
import Image from "next/image";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const res = await createUserWithEmailAndPassword(email, password);
        console.log(res);
        setEmail("");
        setPassword("");
    }
    catch(err){
        console.error(err);
    }
  };   

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-400 p-4">
      <Image src={"/word-boom-logo.png"} alt="Word-Boom! logo" height={50} width={300}/>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">Sign Up</h2>
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
            Create Account
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account? <a href="/sign-in" className="text-orange-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}