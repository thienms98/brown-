"use client";
import Folder from "./Folder";
import { Window } from ".";
import { useDesktop } from "@/store";
import { useEffect, useRef } from "react";

const Desktop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const items = useDesktop((state) => state.items);
  console.log(items[0]);
  const updatePosition = useDesktop((state) => state.updatePosition);

  const onDrop = (e: MouseEvent) => {
    const { pageX, pageY } = e;

    updatePosition({ x: pageX, y: pageY });
  };

  useEffect(() => {
    const desktop = ref.current;
    console.log("🚀 ~ Desktop ~ desktop:", desktop);
    if (!desktop) return;

    desktop.addEventListener("drop", onDrop);

    return () => {
      desktop.removeEventListener("drop", onDrop);
    };
  }, []);

  return (
    <div
      ref={ref}
      draggable
      onDragOver={(e) => e.preventDefault()}
      className="w-screen h-screen bg-blue-300 fixed inset-0 p-3"
    >
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
