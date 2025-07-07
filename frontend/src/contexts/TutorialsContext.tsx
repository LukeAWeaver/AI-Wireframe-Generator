import React, { createContext, useContext, useState, useEffect } from 'react';

interface TutorialsContextType {
  flipControlsAck: boolean;
  setFlipControlsAck: (ack: boolean) => void;
}

const TutorialsContext = createContext<TutorialsContextType>({
  flipControlsAck: false,
  setFlipControlsAck: () => {},
});

export const useTutorialsContext = () => useContext(TutorialsContext);

export const TutorialsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flipControlsAck, setFlipControlsAckState] = useState<boolean>(() => {
    const stored = localStorage.getItem('flipControlsAck');
    return stored === 'true';
  });

  const setFlipControlsAck = (ack: boolean) => {
    setFlipControlsAckState(ack);
    localStorage.setItem('flipControlsAck', ack ? 'true' : 'false');
  };

  useEffect(() => {
    localStorage.setItem('flipControlsAck', flipControlsAck ? 'true' : 'false');
  }, [flipControlsAck]);

  return (
    <TutorialsContext.Provider value={{ flipControlsAck, setFlipControlsAck }}>
      {children}
    </TutorialsContext.Provider>
  );
}; 