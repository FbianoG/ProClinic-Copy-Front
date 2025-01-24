// src/context/MyContext.tsx
'use client';
import { IPlan } from '@/interfaces/iplan';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
	plans: IPlan[] | undefined;
	setPlans: (value: IPlan[]) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const PlansProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [plans, setPlans] = useState<IPlan[] | undefined>(undefined);

	return <MyContext.Provider value={{ plans, setPlans }}>{children}</MyContext.Provider>;
};

// Crie um hook customizado para usar o contexto
export const usePlansContext = (): MyContextType => {
	const context = useContext(MyContext);
	if (context === undefined) {
		throw new Error('useMyContext must be used within a MyProvider');
	}
	return context;
};
