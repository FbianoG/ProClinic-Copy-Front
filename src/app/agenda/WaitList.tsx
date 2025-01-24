'use client';
import { IEvent } from '@/interfaces/event';
import { useEffect, useRef, useState } from 'react';
import WaitCart from './WaitCard';
import { useUserContext } from '@/context/UserContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctorContext } from '@/context/DoctorContext';
import { useSelectDoctorContext } from '@/context/SelectDoctor';
import { useWaitEventContext } from '@/context/WaitEventContext';
import useEvents from '@/hooks/useEvents';

/* eslint-disable react-hooks/exhaustive-deps */

const WaitList = () => {
	const { waitEvents } = useWaitEventContext();

	const [patientsList, setPatientsList] = useState<IEvent[]>([]);

	const { user } = useUserContext();

	const { doctors } = useDoctorContext();

	const { selectDoctor, setSelectDoctor } = useSelectDoctorContext();

	const { getWaitEvents } = useEvents();

	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		if ((user?.role === 'recep' || user?.role === 'admin') && doctors && !selectDoctor) {
			setSelectDoctor(doctors[0]._id);
		}
	}, [doctors]);

	useEffect(() => {
		if (!waitEvents) return;
		if (user?.role === 'doctor') {
			setPatientsList(waitEvents.filter((event) => event.doctor === user._id));
		} else {
			setPatientsList(waitEvents.filter((event) => event.doctor === selectDoctor));
		}
	}, [waitEvents, selectDoctor]);

	useEffect(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = window.setInterval(() => {
			getWaitEvents();
		}, 120000);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null; // Reseta o intervalo
			}
		};
	}, []);

	return (
		<div className='hidden w-72 border-r bg-card md:block'>
			{doctors && user?.role !== 'doctor' && (
				<Select
					defaultValue={selectDoctor || doctors[0]?._id}
					onValueChange={(value) => {
						setSelectDoctor(value);
					}}>
					<SelectTrigger
						id=''
						className='h-12 truncate rounded-none border-b border-x-transparent border-t-transparent p-4 text-lg font-medium capitalize text-primary shadow-none'>
						<SelectValue placeholder='Médico' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{doctors.map((doctor) => (
								<SelectItem key={doctor._id} value={doctor._id} className='capitalize'>
									Dr. {doctor.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			)}

			<h3 className='border-b bg-muted p-4 text-secondary-foreground'>Lista de espera</h3>

			<ul className='waitList flex max-h-[calc(100vh-8rem)] w-full flex-col overflow-y-auto overflow-x-hidden'>
				{patientsList.map((event) => (
					<WaitCart key={event._id} event={event} />
				))}

				{patientsList.length === 0 && <li className='p-2 text-sm'>Nenhum paciente na lista de espera.</li>}
			</ul>
		</div>
	);
};

export default WaitList;
