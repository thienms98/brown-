"use client";
import Folder from "./Folder";
import { Window } from ".";
import { useDesktop } from "@/store";
import { useRef } from "react";

const Desktop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const items = useDesktop((state) => state.items);

  return (
    <div className="w-screen h-screen bg-blue-300 fixed inset-0 p-3">
      {items.map((item) =>
        item.type === "window" ? (
          <Window key={item.id} {...item} />
        ) : (
          <Folder key={item.id} {...item} />
        )
      )}
    </div>
  );
};

export default Desktop;
