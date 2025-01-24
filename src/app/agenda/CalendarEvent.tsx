/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { usePlansContext } from '@/context/PlansContext';
import { EventContentArg } from '@fullcalendar/core/index.js';

interface Props {
	eventInfo: EventContentArg;
}

const CalendarEvent = ({ eventInfo }: Props) => {
	const { plans } = usePlansContext();

	const event = eventInfo.event.extendedProps;

	// cor do aviso de confirmação de wpp de acordo com o status respondido
	const changeColorConfirmed = (e: string) => {
		if (e === '0') return 'none';
		else if (e === '1') return '#32ff23';
		else if (e === '2') return '#ff0000';
	};

	// Barra lateral ao dar chegada no paciente
	const changeColorStatus = (status: string) => {
		if (status === 'atendido') return '#375bfc';
		else if (status === 'chegada') return '#32ff23';
		else if (status === 'atendimento') return '#fcd837';
	};

	return (
		<div className='relative pl-1.5 h-full w-full overflow-hidden p-1' title={eventInfo.event.title}>
			<div className='flex  w-full gap-1 overflow-hidden whitespace-nowrap capitalize'>
				<p>{eventInfo.timeText.slice(0, 5)} -</p>

				<b className='whitespace-nowrap'>{eventInfo.event.title}</b>
			</div>
			<div className='flex justify-between gap-2 capitalize'>
				<p>{event.type}</p>
				<p>{plans?.find((plan) => plan._id === event.plan)?.name}</p>
			</div>
			<span style={{ backgroundColor: changeColorConfirmed(event.confirmed) }} className='absolute left-2 top-0 h-1 w-2 items-center gap-1 rounded'></span>
			<span style={{ backgroundColor: changeColorStatus(event.status) }} className='absolute left-0 top-0 grid h-full w-[3px] place-items-center rounded-full'></span>
		</div>
	);
};

export default CalendarEvent;
