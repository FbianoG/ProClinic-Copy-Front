// src/context/MyContext.tsx
'use client';
import { IDocument } from '@/interfaces/document';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
	documents: IDocument[] | undefined;
	setDocuments: (value: IDocument[]) => void;
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const DocumentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [documents, setDocuments] = useState<IDocument[] | undefined>(undefined);

	return <MyContext.Provider value={{ documents, setDocuments }}>{children}</MyContext.Provider>;
};

// Crie um hook customizado para usar o contexto
export const useDocumentsContext = (): MyContextType => {
	const context = useContext(MyContext);
	if (context === undefined) {
		throw new Error('useMyContext must be used within a MyProvider');
	}
	return context;
};
