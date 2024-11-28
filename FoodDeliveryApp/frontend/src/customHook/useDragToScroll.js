// hooks/useDragToScroll.js

import { useRef } from 'react';

const useDragToScroll = () => {
  const listRef = useRef(null); // Reference to the list
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    startX.current = e.pageX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
    listRef.current.style.cursor = 'grabbing'; // Change cursor during drag
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    listRef.current.style.cursor = 'grab'; // Change cursor back when drag ends
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;
    const x = e.pageX - listRef.current.offsetLeft;
    const scroll = x - startX.current;
    listRef.current.scrollLeft = scrollLeft.current - scroll;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    listRef.current.style.cursor = 'grab'; // Reset cursor when mouse leaves
  };

  return {
    listRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
  };
};

export default useDragToScroll;
