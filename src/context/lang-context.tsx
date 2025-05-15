"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useParams } from "next/navigation";

type LangContextType = {
  lang: string;
  setLang: (lang: string) => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const initialLang = params?.lng?.toString().toLowerCase();

  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    console.log(initialLang);
    setLang(initialLang);
  }, [initialLang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
