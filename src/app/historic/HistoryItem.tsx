'use client';
import { Button } from '@/components/ui/button';
import { useDoctorContext } from '@/context/DoctorContext';
import { usePlansContext } from '@/context/PlansContext';
import { IEvent } from '@/interfaces/event';
import { chooseColorString } from '@/utils/bgGenerator';
import calculeAge from '@/utils/calculeAge';
import { FileHeartIcon, UserCircle2Icon } from 'lucide-react';
import Link from 'next/link';

interface Props {
	event: IEvent;
}

const HistoryItem = ({ event }: Props) => {
	const { doctors } = useDoctorContext();
	const { plans } = usePlansContext();

	return (
		<li key={event._id} className='flex items-center gap-1 border-b bg-card p-4 capitalize leading-4 duration-300 last:border-b-0 hover:bg-background'>
			<div className='flex w-80 flex-col'>
				<p title={event.title} className='font-semibold truncate'>{event.title}</p>
				<div className='flex gap-3 text-sm'>
					<p className='text-center opacity-70'>{calculeAge(event.patientNasc)} anos</p>
					<p className='w-48 opacity-70'>{plans?.find((plan) => plan._id === event.plan)?.name}</p>
				</div>
			</div>

			<p className='w-40 opacity-70'>
				{new Date(event.atendStart as Date).toLocaleDateString().slice(0, 5)} - {new Date(event.atendStart as Date).toLocaleString().slice(11, 17)}h
			</p>

			<p className='w-60 px-4 opacity-70 truncate'>{doctors?.filter((doctor) => doctor._id === event.doctor)[0]?.name}</p>

			<p style={{ color: chooseColorString(event.type) }} className='grid w-32 place-content-center rounded px-4 font-semibold'>
				{event.type}
			</p>

			<div className='ml-5 flex flex-row items-center gap-4 lg:ml-auto'>
				<Link href={`/register?id=${event.patientId}`} className='h-4'>
					<Button variant='link' title='Cadastro' className='h-max p-0 duration-300 hover:opacity-70'>
						<UserCircle2Icon size={20} />
					</Button>
				</Link>

				<Link href={`/atend?id=${event.patientId}`} className='h-4'>
					<Button variant='link' title='Prontuário' className='h-max p-0 duration-300 hover:opacity-70'>
						<FileHeartIcon size={20} />
					</Button>
				</Link>
			</div>
		</li>
	);
};

export default HistoryItem;
