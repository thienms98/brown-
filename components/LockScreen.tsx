"use client";

import Clock from "@/components/Clock";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lock, setLock] = useState(true);

  return (
    <div
      className={`lock-screen relative z-1 ${lock ? "" : "hide"}`}
      onClick={() => {
        setLock(false);

        // document.body.requestFullscreen()
      }}
    >
      <Image
        className="fixed z-0 object-cover w-full h-full"
        src="/landscape_3.jpg"
        alt="background"
        width={1920}
        height={1080}
      />

      <main className="w-full h-screen grid grid-cols-3 grid-rows-3 relative z-1 backdrop-brightness-80">
        <div className="col-start-1 row-span-3"></div>
        <div className="col-start-3 row-span-3"></div>
        <Clock className="col-start-2 row-start-1 text-center flex flex-col justify-center" />
        <div className="size-fit self-center justify-self-center text-center hover:bg-black/70 p-12 transition-all duration-300 rounded-lg">
          <div>Trần Đức Thiện</div>
          <div>thienms98@gmail.com</div>
        </div>
        <div></div>
      </main>
    </div>
  );
}
