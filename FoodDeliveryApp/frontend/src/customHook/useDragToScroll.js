import { useRef } from 'react';

const useDragToScroll = () => {
  const listRef = useRef(null); // Reference to the list
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    startX.current = e.pageX - listRef.current.offsetLeft; // Track initial horizontal mouse position
    startY.current = e.pageY - listRef.current.offsetTop; // Track initial vertical mouse position
    scrollLeft.current = listRef.current.scrollLeft; // Get the initial horizontal scroll position
    scrollTop.current = listRef.current.scrollTop; // Get the initial vertical scroll position
    listRef.current.style.cursor = 'grabbing'; // Change cursor during drag
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    listRef.current.style.cursor = 'grab'; // Change cursor back when drag ends
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;

    const x = e.pageX - listRef.current.offsetLeft; // Current horizontal mouse position
    const y = e.pageY - listRef.current.offsetTop; // Current vertical mouse position

    const scrollX = x - startX.current; // Calculate horizontal scroll movement
    const scrollY = y - startY.current; // Calculate vertical scroll movement

    // Update both horizontal and vertical scroll positions
    listRef.current.scrollLeft = scrollLeft.current - scrollX;
    listRef.current.scrollTop = scrollTop.current - scrollY;
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
