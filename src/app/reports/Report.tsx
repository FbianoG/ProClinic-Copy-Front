'use client';

import { useEventContext } from '@/context/EventContext';
import useDoctor from '@/hooks/useDoctor';
import { useEffect, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const Report = () => {
	const { events } = useEventContext();

	const { getDoctors } = useDoctor();

	const [result, setResult] = useState<{ mes: string; count: number }[]>();

	useEffect(() => {
		getDoctors();
		setTimeout(() => {
			setResult([]);
		}, 100);
	}, []);

	useEffect(() => {
		if (!events) return;

		const aga = events.reduce((acc: any, e) => {
			const month = new Date(e.start).toISOString().slice(0, 7);
			acc[month] = (acc[month] || 0) + 1;
			return acc;
		}, {});

		const afa = Object.entries(aga)
			.map(([key, value]) => {
				return {
					mes: key,
					count: value,
				};
			})
			.sort((a, b) => a.mes.localeCompare(b.mes));

		if (afa.length > 0) setResult(afa as { mes: string; count: number }[]);
	}, [events]);

	return (
		<div className='mt-8 space-y-2 rounded bg-card p-4 shadow'>
			{result && (
				<div className='flex justify-between'>
					<h2 className='text-xl font-semibold text-primary'>Relatório</h2>
					<p className='text-right text-xs'>Criado em: {new Date().toLocaleString()}</p>
				</div>
			)}
			{result &&
				result?.length > 0 &&
				result?.map((e: { mes: string; count: number }, index: number) => (
					<div key={index} className=''>
						<h3 className='rounded bg-muted p-1 font-semibold'>Mês de Referência: {e.mes}</h3>
						<p className='indent-4 text-sm'>Atendimentos: {e.count}</p>
					</div>
				))}

			{result?.length === 0 && <p className='text-center'>Não há atendimento anterior.</p>}
		</div>
	);
};

export default Report;
