"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface SharedState {
  currentStory: string | null;
  currentChapter: number | null;
}

type StateContextType = {
  sharedState: SharedState;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

const initialState: SharedState = {
  currentStory: null,
  currentChapter: null,
};

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [sharedState, setSharedState] = useState<SharedState>(() => {
    // Load from localStorage if available, otherwise use initialState
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('sharedState');
      console.log(storedState)
      return storedState ? JSON.parse(storedState) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    // Save to localStorage whenever sharedState changes
    localStorage.setItem('sharedState', JSON.stringify(sharedState));
  }, [sharedState]);

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
