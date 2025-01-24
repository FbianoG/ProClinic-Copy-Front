'use client';
import Header from '@/components/shared/Header';
import Loader from '@/components/shared/Loader';
import { useDoctorContext } from '@/context/DoctorContext';
import { useUserContext } from '@/context/UserContext';
import useCombo from '@/hooks/useCombo';
import { IEvent } from '@/interfaces/event';
import { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import SelectDoctor from './SelectDoctor';

/* eslint-disable react-hooks/exhaustive-deps */

const Historic = () => {
	const { doctors } = useDoctorContext();

	const { user } = useUserContext();

	const { getHistory, loading } = useCombo();

	const [selectedDoctor, setSelectedDoctor] = useState<string>('todos');

	const [historyEvents, setHistoryEvents] = useState<IEvent[]>();

	useEffect(() => {
		getHistory(setHistoryEvents);
	}, []);

	useEffect(() => {
		if (user?.role === 'doctor') setSelectedDoctor(user._id);
	}, [user]);

	return (
		<>
			<Header />
			<main className='overflow-hidden p-4 md:px-8 lg:px-16'>
				<h1 className='mb-8 text-2xl font-medium text-primary'>Histórico de Atendimentos</h1>

				<section>
					{doctors && user && user.role !== 'doctor' && <SelectDoctor setSelectedDoctor={setSelectedDoctor} selectedDoctor={selectedDoctor} />}

					<div className='waitList w-full overflow-auto rounded bg-card p-4 shadow'>
						<div className='flex w-full min-w-max gap-1 border-b p-4 pt-0 font-bold'>
							<p className='w-80'>Nome</p>

							<p className='w-40'>Data / Hora</p>
							<p className='w-60 px-4'>Médico</p>
							<p className='w-32 text-center'>Procedimento</p>
						</div>

						<ul className='min-w-max'>
							{loading && (
								<div className='grid place-items-center py-20'>
									<Loader text='Carregando Atendimentos' />
								</div>
							)}

							{!loading && historyEvents && historyEvents.length === 0 && <p className='py-10 text-center'>Médico não possui paciente atendido.</p>}

							{!loading &&
								doctors &&
								historyEvents &&
								historyEvents.length > 0 &&
								historyEvents
									?.filter((event) => {
										if (user?.role !== 'doctor') {
											if (selectedDoctor !== 'todos') return event.doctor === selectedDoctor;
											else return event;
										} else return event;
									})
									.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
									.map((event) => <HistoryItem key={event._id} event={event} />)}
						</ul>
					</div>
				</section>
			</main>
		</>
	);
};

export default Historic;
