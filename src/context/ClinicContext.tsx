// src/context/MyContext.tsx
'use client';
import { IClinic } from '@/interfaces/clinic';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
	clinic?: IClinic;
	setClinic: (value: IClinic) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const ClinicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [clinic, setClinic] = useState<IClinic>();

	return <MyContext.Provider value={{ clinic, setClinic }}>{children}</MyContext.Provider>;
};

// Crie um hook customizado para usar o contexto
export const useClinicContext = (): MyContextType => {
	const context = useContext(MyContext);
	if (context === undefined) {
		throw new Error('useMyContext must be used within a MyProvider');
	}
	return context;
};
