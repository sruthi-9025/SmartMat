
import { useState, useEffect } from 'react';

export function usePageTransition() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return {
    initial: { opacity: 0, y: 10 },
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  };
}

export function useStaggeredChildren(count: number, staggerDelay = 0.05) {
  return Array.from({ length: count }).map((_, i) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      delay: i * staggerDelay,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }));
}

export function useAnimatedContent() {
  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }  
      }
    }
  };
}
