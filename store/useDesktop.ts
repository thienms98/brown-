import { v4 } from "uuid";
import { create } from "zustand";

export interface DesktopBaseItem {
  id: string;
  title: string;
  position: { x: number; y: number };
}

export interface DesktopIcon extends DesktopBaseItem {
  type: "folder" | "app";
}

export interface WindowItem extends DesktopBaseItem {
  type: "window";
  dimensions: { x: number; y: number };
  isMinimize: boolean;
  // zIndex: number
}

export type DesktopItem = DesktopIcon | WindowItem;

interface DesktopState {
  items: DesktopItem[];
  dragging: DesktopItem | null;
  setDragging: (item: DesktopItem | null) => void;
  updatePosition: (position: { x: number; y: number }) => void;
  addWindow: (item: DesktopIcon) => void;
}

export const useDesktop = create<DesktopState>((set) => ({
  items: [
    {
      id: v4(),
      type: "folder",
      title: "New Folder",
      position: { x: 12, y: 12 }
    }
  ],
  dragging: null,
  setDragging(item: DesktopItem | null) {
    set(() => ({ dragging: item }));
  },
  updatePosition(position: { x: number; y: number }) {
    set((state) => {
      console.log(state.dragging);
      if (!state.dragging) return {};
      console.log("update", position);

      return {
        items: [...state.items].map((i) =>
          i.id === state.dragging!.id ? { ...i, position } : i
        ),
        dragging: null
      };
    });
  },
  addWindow(item: DesktopIcon) {
    set((state) => {
      const { innerWidth, innerHeight } = window;
      const windowItem: WindowItem = {
        ...item,
        id: v4(),
        type: "window",
        dimensions: { x: 800, y: 600 },
        position: { x: (innerWidth - 800) / 2, y: (innerHeight - 600) / 2 },
        isMinimize: false
      };
      return {
        items: [...state.items, windowItem]
      };
    });
  }
}));
