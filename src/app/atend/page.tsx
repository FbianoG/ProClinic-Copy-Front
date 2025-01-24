'use client';
import Header from '@/components/shared/Header';
import useEvents from '@/hooks/useEvents';
import { IEvent } from '@/interfaces/event';
import { Toast } from '@/utils/Toast';
import { useEffect, useState } from 'react';
import MedicalRecord from './MedicalRecord';
import PatientDetails from './PatientDetails';
import SideBar from './SideBar';
import Title from '@/components/shared/Title';
import useCombo from '@/hooks/useCombo';
import { IMedicalRecord } from '@/interfaces/medicalRecord';
import Loader from '@/components/shared/Loader';

/* eslint-disable react-hooks/exhaustive-deps */

const Atend = () => {
	const { initEvent } = useEvents();

	const { getAtend, patient, loading } = useCombo();

	const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>();

	const [wEvents, setWEvents] = useState<IEvent[]>();

	const [eventActive, setEventActive] = useState<IEvent | null>(null);

	const [showEventActive, setShowEventActive] = useState<boolean>(false);

	useEffect(() => {
		getAtend(setMedicalRecords, setWEvents);
	}, []);

	const initAtend = (eventId: string) => {
		console.log( wEvents );
		if (!wEvents) return;
		if (eventActive) {
			Toast('Erro', 'Paciente já possui atendimento em andamento.', '⛔');
			return;
		}
		initEvent(eventId, setWEvents, wEvents, setShowEventActive);
	};

	return (
		<>
			<Header />
			<main className='flex'>
				<SideBar wEvents={wEvents} initAtend={initAtend} eventActive={eventActive} setEventActive={setEventActive} />
				<section className='h-[calc(100vh-4rem)] flex-1 overflow-x-auto px-[2%] pt-4'>
					<Title text='Atendimento' />
					{!loading && patient && medicalRecords && (
						<>
							<PatientDetails patient={patient} />
							<MedicalRecord
								medicalRecords={medicalRecords}
								setMedicalRecords={setMedicalRecords}
								eventActive={eventActive}
								showEventActive={showEventActive}
								setShowEventActive={setShowEventActive}
								setEventActive={setEventActive}
								setWEvents={setWEvents}
								wEvents={wEvents}
							/>
						</>
					)}
					{loading && (
						<div className='py-20'>
							<Loader text='Carregando atendimento' />
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default Atend;
