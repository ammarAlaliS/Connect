import React, { useState, useCallback, useRef } from "react";

export const useScrollToBottom = (flatListRef) => {
    const scrollToBottom = useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, [flatListRef]);
  
    return scrollToBottom;
  };

  export const useIsScrollingDown = () => {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastOffsetY, setLastOffsetY] = useState(0);
  
    const handleScroll = useCallback((event) => {
      const currentOffsetY = event.nativeEvent.contentOffset.y;
  
      if (currentOffsetY > lastOffsetY) {
        if (!isScrollingDown) {
          setIsScrollingDown(true);
          setTimeout(() => setIsScrollingDown(false), 2000);
        }
      }
  
      setLastOffsetY(currentOffsetY);
    }, [lastOffsetY, isScrollingDown]);
  
    return { isScrollingDown, handleScroll, setIsScrollingDown };
  };

