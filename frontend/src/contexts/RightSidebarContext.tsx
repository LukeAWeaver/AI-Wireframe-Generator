import React, { createContext, useContext, useState, ReactNode } from 'react';

const RightSidebarContext = createContext<{
  sidebarContent: ReactNode;
  setSidebarContent: (content: ReactNode) => void;
}>({
  sidebarContent: null,
  setSidebarContent: () => {},
});

interface RightSidebarProviderProps { children: React.ReactNode; }
export const RightSidebarProvider = ({ children }: RightSidebarProviderProps) => {
  const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
  return (
    <RightSidebarContext.Provider value={{ sidebarContent, setSidebarContent }}>
      {children}
    </RightSidebarContext.Provider>
  );
};

export const useRightSidebar = () => useContext(RightSidebarContext); 