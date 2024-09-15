"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface SharedState {
  currentStory: string | null;
  currentChapter: number | null;
}

type StateContextType = {
  sharedState: SharedState;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [sharedState, setSharedState] = useState<SharedState>({
    currentStory: null,
    currentChapter: null,
  }); // Replace 'any' with your desired type

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
