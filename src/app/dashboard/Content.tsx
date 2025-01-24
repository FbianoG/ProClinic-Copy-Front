'use client';

import Loader from '@/components/shared/Loader';
import { useEventContext } from '@/context/EventContext';
import { usePlansContext } from '@/context/PlansContext';
import useCombo from '@/hooks/useCombo';
import { useEffect, useState } from 'react';
import ChartAge from './ChartAge';
import ChartPlans from './ChartPlans';
import ChartProced from './ChartProced';
import ChartStatus from './ChartStatus';
import ChartConfirm from './ChartConfirm';
import { useUserContext } from '@/context/UserContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctorContext } from '@/context/DoctorContext';
import { Label } from '@/components/ui/label';
import { IEvent } from '@/interfaces/event';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

const Content = () => {
	const { events } = useEventContext();

	const { plans } = usePlansContext();

	const { user } = useUserContext();

	const { doctors } = useDoctorContext();

	const { getDashboard, loading } = useCombo();

	const [selectDoctor, setSelectDoctor] = useState<string>('todos');

	const [filteredEvents, setFilteredEvents] = useState<IEvent[]>();

	useEffect(() => {
		getDashboard();
	}, []);

	useEffect(() => {
		if (!events || !plans || !doctors) return;
		if (selectDoctor === 'todos') return setFilteredEvents(events);
		else setFilteredEvents(events.filter((e) => e.doctor === selectDoctor));
	}, [selectDoctor, events]);

	return (
		<>
			{loading && !events && !plans && <Loader text='Carregando Dashboard' />}
			{!loading && filteredEvents && plans && user?.role !== 'recep' && (
				<div className='flex w-full flex-wrap justify-center gap-4 pb-4 md:gap-10'>
					{user?.role === 'admin' && doctors && (
						<div className='-mb-2 mr-auto grid w-full gap-1 md:-mb-6 md:w-max'>
							<Label className='text-lg font-semibold text-foreground'>Médico</Label>
							<Select
								defaultValue={selectDoctor || doctors[0]._id}
								onValueChange={(value) => {
									setSelectDoctor(value);
								}}>
								<SelectTrigger id='' className='focus:ring-none w-full rounded border-none bg-card capitalize shadow md:w-60'>
									<SelectValue placeholder='Médico' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='todos' className='capitalize'>
											Todos
										</SelectItem>
										{doctors.map((doctor) => (
											<SelectItem key={doctor._id} value={doctor._id} className='capitalize'>
												Dr. {doctor.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					)}

					<ChartConfirm events={filteredEvents} />

					<ChartStatus events={filteredEvents} />

					<ChartProced events={filteredEvents} />

					<ChartPlans events={filteredEvents} />

					<ChartAge events={filteredEvents} />
				</div>
			)}
		</>
	);
};

export default Content;
