import { useState, useEffect, useCallback } from 'react';

const BROADCAST_CHANNEL = 'dekut_cu_broadcast';

export function useSyncState(initialState) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(BROADCAST_CHANNEL);
    return saved ? JSON.parse(saved) : initialState;
  });

  const channel = useEffect(() => {
    const bc = new BroadcastChannel(BROADCAST_CHANNEL);
    
    bc.onmessage = (event) => {
      setState(event.data);
      localStorage.setItem(BROADCAST_CHANNEL, JSON.stringify(event.data));
    };

    return () => bc.close();
  }, []);

  const updateState = useCallback((newState) => {
    const updated = typeof newState === 'function' ? newState(state) : newState;
    setState(updated);
    
    const bc = new BroadcastChannel(BROADCAST_CHANNEL);
    bc.postMessage(updated);
    bc.close();
    
    localStorage.setItem(BROADCAST_CHANNEL, JSON.stringify(updated));
  }, [state]);

  return [state, updateState];
}
