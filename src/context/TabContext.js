"use client";

import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userProfile, setUserProfile] = useState({
    name: "Rakesh",
    dailyGoal: 2,
    emailReminders: true,
    publicProfile: false,
  });

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, userProfile, setUserProfile }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within TabProvider");
  }
  return context;
}
