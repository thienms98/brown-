import { WindowItem } from "@/store";
import { HTMLAttributes } from "react";

const Window = ({
  position,
  dimensions,
  isMinimize,
  type,
  id,
  ...props
}: HTMLAttributes<HTMLDivElement> & WindowItem) => {
  return (
    <div
      {...props}
      className={`border  ${props.className}`}
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
