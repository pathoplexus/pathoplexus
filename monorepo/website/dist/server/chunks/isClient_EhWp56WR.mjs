import { useState, useEffect } from 'react';

function useClientFlag() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

export { useClientFlag as u };
