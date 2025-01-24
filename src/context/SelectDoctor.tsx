// src/context/MyContext.tsx
'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
	selectDoctor: string | undefined;
	setSelectDoctor: (value: string) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const SelectDoctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectDoctor, setSelectDoctor] = useState<string | undefined>(undefined);

	return <MyContext.Provider value={{ selectDoctor, setSelectDoctor }}>{children}</MyContext.Provider>;
};

// Crie um hook customizado para usar o contexto
export const useSelectDoctorContext = (): MyContextType => {
	const context = useContext(MyContext);
	if (context === undefined) {
		throw new Error('useMyContext must be used within a MyProvider');
	}
	return context;
};
