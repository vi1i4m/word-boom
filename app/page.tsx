"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push("/sign-up");
    }
  }, [user, router]);
  
  if (!user) {
    return null; // or a loading spinner
  }
  
  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <Image src={"/word-boom-logo.png"} alt="Word-Boom! logo" height={100} width={300}/>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-400 mb-2">Welcome!</h1>
          <p className="text-gray-600 text-center">
            {user?.displayName || user?.email}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/game-demo" 
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full w-full block text-center transition-colors duration-300"
          >
            Start Game
          </Link>
          
          <button 
            onClick={() => {
              auth.signOut();
              sessionStorage.removeItem("user");
            }} 
            className="bg-white hover:bg-gray-100 text-orange-400 font-bold py-3 px-6 rounded-full w-full block text-center border-2 border-orange-400 transition-colors duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}