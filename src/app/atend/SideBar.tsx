'use client';

import { Button } from '@/components/ui/button';
import { useDoctorContext } from '@/context/DoctorContext';
import { useUserContext } from '@/context/UserContext';
import { IEvent } from '@/interfaces/event';
import { useEffect, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	wEvents?: IEvent[];
	eventActive: IEvent | null;
	initAtend: (value: string) => void;
	setEventActive: (value: IEvent | null) => void;
}

const SideBar = ({ wEvents, eventActive, initAtend, setEventActive }: Props) => {
	const { user } = useUserContext();

	const { doctors } = useDoctorContext();

	const [eventsConfirm, setEventsConfirm] = useState<IEvent[]>();

	useEffect(() => {
		if (!wEvents || !user) return;

		const patientId = new URLSearchParams(window.location.search).get('id');

		// verifica eventos com chegada confirmada
		// let eventChegada;
		// if (user.role === 'doctor') {
		// 	eventChegada = wEvents.filter((event) => event.status === 'chegada' && event.patientId === patientId && event.doctor === user._id);
		// } else {
		// 	eventChegada = wEvents.filter((event) => event.status === 'chegada' && event.patientId === patientId);
		// }
		// const eventChegadaSort = eventChegada.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
		setEventsConfirm(wEvents);

		// verifica eventos com atendimento ativo
		const eventActive = wEvents.find((event) => event.status === 'atendimento' && event.patientId === patientId && event.doctor === user._id);
		setEventActive(eventActive || null);
	}, [wEvents]);

	return (
		<div className='hidden h-[calc(100vh-4rem)] w-72 border-r bg-card md:block'>
			<h3 className='border-b p-4'>Chegadas Confirmadas</h3>
			<ul className='waitList flex max-h-[calc(100vh-8rem)] flex-col overflow-y-auto'>
				{eventsConfirm &&
					eventsConfirm.length > 0 &&
					eventsConfirm.map((event, index) => (
						<li key={index} className='group relative w-full border-b bg-card p-2 text-sm duration-300 hover:bg-muted'>
							<h4 className='font-semibold text-primary'>{event.status === 'atendimento' ? 'Em Atendimento' : 'Chegada'}</h4>
							{user?.role !== 'doctor' && <p className='text-xs capitalize'>Dr. {doctors?.find((doctor) => doctor._id === event.doctor)?.name}</p>}
							<div className='flex gap-2'>
								<p className='font-bold'>Data:</p>
								<p>{new Date(event.start).toLocaleDateString() === new Date().toLocaleDateString() ? 'Hoje' : new Date(event.start).toLocaleDateString()} </p>
							</div>
							<div className='flex gap-2'>
								<p className='font-bold'>Hora:</p>
								<p>{new Date(event.start).toLocaleTimeString().slice(0, 5)}h</p>
							</div>
							<div className='flex gap-2'>
								<p className='font-bold'>Tipo:</p>
								<p className='capitalize'>{event.type}</p>
							</div>
							{eventActive && (
								<Button className='absolute bottom-0 right-0 ml-auto mt-2 hidden bg-emerald-500 hover:bg-emerald-400 group-hover:block' disabled>
									Em Atendimento
								</Button>
							)}
							{!eventActive && user?.role === 'doctor' && (
								<Button
									onClick={() => initAtend(event._id as string)}
									className='absolute bottom-0 right-0 ml-auto mt-2 hidden bg-emerald-500 hover:bg-emerald-400 group-hover:block'>
									Atender
								</Button>
							)}
						</li>
					))}
			</ul>
		</div>
	);
};

export default SideBar;
