// src/context/MyContext.tsx
'use client';
import { IEvent } from '@/interfaces/event';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
	waitEvents: IEvent[] | undefined;
	setWaitEvents: (value: IEvent[]) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const WaitEventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [waitEvents, setWaitEvents] = useState<IEvent[] | undefined>(undefined);

	return <MyContext.Provider value={{ waitEvents, setWaitEvents }}>{children}</MyContext.Provider>;
};

// Crie um hook customizado para usar o contexto
export const useWaitEventContext = (): MyContextType => {
	const context = useContext(MyContext);
	if (context === undefined) {
		throw new Error('useMyContext must be used within a MyProvider');
	}
	return context;
};
