// src/context/MyContext.tsx
"use client";
import { IUser } from '@/interfaces/user';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
  doctors: IUser[] | undefined;
  setDoctors: (value: IUser[]) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const DoctorPriver: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<IUser[]| undefined>(undefined);

  return (
    <MyContext.Provider value={{ doctors, setDoctors }}>
      {children}
    </MyContext.Provider>
  );
};

// Crie um hook customizado para usar o contexto
export const useDoctorContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};