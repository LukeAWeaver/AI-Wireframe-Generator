import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface RightSidebarContextType {
  sidebarContent: ReactNode;
  setSidebarContent: Dispatch<SetStateAction<ReactNode>>;
}

const RightSidebarContext = createContext<RightSidebarContextType | undefined>(undefined);

export const useRightSidebar = () => {
  const context = useContext(RightSidebarContext);
  if (!context) {
    throw new Error('useRightSidebar must be used within a RightSidebarProvider');
  }
  return context;
};

export const RightSidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
  return (
    <RightSidebarContext.Provider value={{ sidebarContent, setSidebarContent }}>
      {children}
    </RightSidebarContext.Provider>
  );
}; 