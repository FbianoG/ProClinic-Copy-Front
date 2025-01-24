'use Client';

import { useEffect, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
	data: any;
}

const GuiaReceit = ({ data }: Props) => {
	const [text, setText] = useState<string[]>();

	useEffect(() => {
		if (data.text) {
			setText(data.text.split('\n'));
		}
	}, []);

	const phoneFormater = (phone: string) => phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');

	return (
		<div className='mx-auto flex h-[1400px] w-[1000px] flex-col bg-card p-10 shadow print:shadow-none'>
			<div className='max-h-[70px] max-w-[270px]'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={data.src} alt='logo' className='h-full w-full object-cover' />
			</div>
			<div className='mt-14 px-20'>
				<p className='text-xl capitalize'>
					<span className='font-bold'>Paciente: </span>
					{data.name}
				</p>
				<p>
					<span className='font-bold'>Data: </span>
					{new Date(data.date).toISOString().split('T')[0].split('-').reverse().join('/')}
				</p>
				<p>
					<span className='font-bold'>Hora: </span>
					{data.time}h
				</p>
				<p className='mt-20 text-xl font-bold'>Receituário:</p>
				{text?.map((p, index) => (
					<p key={index} className='mt-2 text-justify text-lg'>
						{p}
					</p>
				))}
			</div>
			<div className='mt-auto border-t pt-8 text-center text-[#aaa]'>
				<p className='capitalize'>{data.clinic}</p>
				<p>
					tel: {phoneFormater(data.phone)} / {data.address}
				</p>
			</div>
		</div>
	);
};

export default GuiaReceit;
