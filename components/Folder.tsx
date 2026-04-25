import { DesktopIcon, useDesktop } from "@/store";
import { FolderIcon } from "lucide-react";
import { HTMLAttributes, useEffect, useRef } from "react";

const Folder = ({
  id,
  position,
  type,
  title,
  ...props
}: HTMLAttributes<HTMLDivElement> & DesktopIcon) => {
  const addWindow = useDesktop((state) => state.addWindow);
  const setDragging = useDesktop((state) => state.setDragging);
  const ref = useRef<HTMLDivElement>(null);

  const onDrag = (e: MouseEvent) => {
    setDragging({ id, position, type, title });
    // console.log(e.pageX, e.pageX);
  };
  const onDragOver = (e: MouseEvent) => {
    e.preventDefault();
  };
  const onDrop = (e: MouseEvent) => {
    console.log("drop: ", e.pageX, e.pageY);
  };
  const onDblClick = () => {
    addWindow({ id, position, type, title });
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
      draggable
      {...props}
      title={title}
      className={`absolute py-1 max-w-18 flex flex-col items-center hover:bg-white/20 size-fit rounded-md cursor-pointer transition-colors duration-300 ${props.className}`}
      style={{
        ...props.style,
        top: position.y,
        left: position.x
      }}
    >
      <span className="px-2">
        <FolderIcon fill="yellow" stroke="orange" size={52} strokeWidth={1} />
      </span>
      <span className="truncate max-w-full text-sm px-0.5">{title}</span>
    </div>
  );
};

export default Folder;
