import { useEffect } from 'react';

const useDocumentOnLoad = (callback: () => void) => {
  useEffect(() => {
    const handleLoad = () => {
      callback();
    };

    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [callback]);
};

export default useDocumentOnLoad;
