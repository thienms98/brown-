"use client";

import { useDesktop, WindowItem } from "@/store";
import { HTMLAttributes, useEffect, useRef } from "react";

const Window = ({
  position,
  dimensions,
  isMinimize,
  type,
  id,
  title,
  ...props
}: HTMLAttributes<HTMLDivElement> & WindowItem) => {
  const ref = useRef<HTMLDivElement>(null);
  const firstPickRef = useRef<{ x: number; y: number }>(null);
  const addWindow = useDesktop((state) => state.addWindow);
  const setDragging = useDesktop((state) => state.setDragging);

  const onDrag = (e: MouseEvent) => {
    const windowItem = ref.current;
    if (!windowItem) return;
    const { pageX, pageY } = e;
    console.log("🚀 ~ onDrag ~ firstPickRef.current:", firstPickRef.current);
    if (!firstPickRef.current) firstPickRef.current = { x: pageX, y: pageY };
    const left = position.x + pageX - firstPickRef.current.x;
    const top = position.y + pageY - firstPickRef.current.y;

    windowItem.style.left = `${left}px`;
    windowItem.style.top = `${top}px`;

    setDragging({ id, position, type, title, isMinimize, dimensions });
  };
  const onDragOver = (e: MouseEvent) => {
    e.preventDefault();
  };
  const onDrop = (e: MouseEvent) => {
    console.log("drop: ", e.pageX, e.pageY);
  };
  const onDblClick = () => {
    // addWindow({ id, position, type, title });
  };

  useEffect(() => {
    const item = ref.current;
    if (!item) return;

    item.addEventListener("drag", onDrag);
    item.addEventListener("dragover", onDragOver);
    // item.addEventListener("drop", onDrop);
    item.addEventListener("dblclick", onDblClick);

    return () => {
      item.removeEventListener("drag", onDrag);
      item.removeEventListener("dragover", onDragOver);
      // item.removeEventListener("drop", onDrop);
      item.removeEventListener("dblclick", onDblClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      {...props}
      draggable
      className={`bg-white text-black transition-all linear duration-0 ${props.className}`}
      style={{
        ...props.style,
        position: "absolute",
        top: position.y,
        left: position.x,
        width: dimensions.x,
        height: dimensions.y
      }}
    >
      Window
    </div>
  );
};

export default Window;
