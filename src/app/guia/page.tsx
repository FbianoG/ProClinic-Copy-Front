'use client';

import { useEffect, useState } from 'react';
import GuiaSadt from './GuiaSadt';
import { useUserContext } from '@/context/UserContext';
import { Toast } from '@/utils/Toast';
import GuiaInt from './GuiaInt';
import GuiaReceit from './GuiaReceit';

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
const Guia = () => {
	const [type, setType] = useState<'sadt' | 'int' | 'receit'>();

	const [data, setData] = useState<any>();

	const { user } = useUserContext();

	useEffect(() => {
		const res = JSON.parse(localStorage.getItem('Guia') as string);
		setData(res);
		setType(res.typeGuia);
		console.log( res.typeGuia )
		if (!user) {
			Toast('Erro', 'Usuário não conectado', '⛔');
			console.log('não logado');
			return;
		}
	}, []);

	return (
		<>
			{data && type === 'sadt' && <GuiaSadt data={data} />}
			{data && type === 'int' && <GuiaInt data={data} />}
			{data && type === 'receit' && <GuiaReceit data={data} />}
		</>
	);
};

export default Guia;
