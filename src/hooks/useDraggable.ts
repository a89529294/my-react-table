import { RefObject, useEffect } from "react";

function useDraggable(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const draggableEle = ref.current;

    if (!draggableEle) return;
    const mouseDownHandler = function (e: MouseEvent) {
      draggableEle.style.cursor = "grabbing ";
      pos = {
        // The current scroll
        left: draggableEle.scrollLeft,
        top: draggableEle.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e: MouseEvent) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      draggableEle.scrollTop = pos.top - dy;
      draggableEle.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      draggableEle.style.cursor = "grab";
    };

    const mouseEnterHandler = function () {
      draggableEle.style.cursor = "grab";
    };

    draggableEle.addEventListener("mousedown", mouseDownHandler);
    draggableEle.addEventListener("mouseenter", mouseEnterHandler);

    return () => {
      draggableEle.removeEventListener("mousedown", mouseDownHandler);
      draggableEle.removeEventListener("mouseenter", mouseEnterHandler);
    };
  }, [ref]);
}

export default useDraggable;
