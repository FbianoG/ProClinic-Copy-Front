import { IEvent } from '@/interfaces/event';
import calculeAge from '@/utils/calculeAge';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { usePlansContext } from '@/context/PlansContext';

interface Props {
	event: IEvent;
}

const WaitCart = ({ event }: Props) => {
	const { user } = useUserContext();

	const { plans } = usePlansContext();

	return (
		<li key={event._id} className='group relative border-b bg-card p-2 px-4 capitalize text-accent-foreground duration-300 hover:bg-muted'>
			<Link href={`/atend?id=${event.patientId}`} className='font-semibold hover:opacity-70 duration-300 truncate block'>{event.title}</Link>
			<div className='flex justify-between text-xs'>
				<div className='flex gap-1 font-medium text-primary'>
					<p>{new Date(event.start).toLocaleDateString('pt-BR').slice(0, 5)}</p>
					<span>-</span>
					<p>{new Date(event.start).toTimeString().slice(0, 5)}h</p>
				</div>
				<p>{calculeAge(event.patientNasc)} anos</p>
			</div>
			<div className='flex justify-between text-xs'>
				<p>{event.type}</p>
				<p>{plans && plans.find((plan) => plan._id === event.plan)?.name}</p>
			</div>

			{user?.role === 'admin' ||
				(user?.role === 'doctor' && event.status === 'atendimento' && (
					<Link href={`/atend?id=${event.patientId}&event=${event._id}`}>
						<Button className='absolute bottom-0 right-0 z-50 hidden h-10 bg-yellow-500 shadow-xl hover:bg-yellow-400 group-hover:block'>Voltar ao Atendimento</Button>
					</Link>
				))}
		</li>
	);
};

export default WaitCart;
