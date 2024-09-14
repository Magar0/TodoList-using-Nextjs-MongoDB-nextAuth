import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="flex h-full w-screen flex-col items-center gap-10">
      {/* <div className="h-3/4 w-4/5 bg-[url('/img/todos.webp')]"> */}
      {/* <div className="flex h-full w-full justify-center"> */}
      <div className="relative mt-5 h-3/5 w-4/5 rounded-lg bg-[url('/img/todos.webp')]">
        <div className="absolute bottom-0 left-0 h-3/5 w-full bg-gradient-to-t from-[#030712] to-transparent"></div>
        {/* <div className="absolute bottom-0 left-0 h-full w-1/5 bg-gradient-to-r from-[#030712] to-transparent"></div>
        <div className="absolute bottom-0 right-0 h-full w-1/5 bg-gradient-to-l from-[#030712] to-transparent"></div> */}
      </div>
      <div>
        <div className="text-xl font-bold text-white md:text-3xl">
          Welcome To my to Do List Page
        </div>
        <p className="text-center text-white">
          <Link href="/login" className="text-2xl text-blue-500">
            Login
          </Link>{" "}
          to Continue
        </p>
      </div>
      {/* </div> */}
    </main>
  );
};

export default Home;
