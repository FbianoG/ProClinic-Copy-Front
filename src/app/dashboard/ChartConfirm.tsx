'use Client';

import { IEvent } from '@/interfaces/event';
import { CheckCircle, LucideWifiOff, Timer, XCircle } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
	events: IEvent[];
}

const ChartConfirm = ({ events }: Props) => {

	useEffect(() => {
		if (!events) return;
	}, [events]);

	return (
		<div className='w-full rounded bg-card p-2 shadow'>
			<h3 className='text-lg font-semibold text-primary'>Atendimentos Confirmados (Hoje)</h3>
			{events && (
				<div className='flex flex-col justify-around gap-y-4 py-5 md:flex-row'>
					<div className='flex flex-col items-center text-green-500'>
						<h4 className='text-4xl'>
							{events.filter((e) => new Date(e.start).toLocaleDateString() === new Date().toLocaleDateString() && e.confirmed === '1').length}
						</h4>
						<p className='flex items-center gap-1'>
							<CheckCircle size={15} />
							Confirmados
						</p>
					</div>
					<div className='flex flex-col items-center text-slate-500'>
						<h4 className='text-4xl'>
							{events.filter((e) => new Date(e.start).toLocaleDateString() === new Date().toLocaleDateString() && e.confirmed === '0').length}
						</h4>
						<p className='flex items-center gap-1'>
							<Timer size={15} />
							Aguardando Resposta
						</p>
					</div>
					<div className='flex flex-col items-center text-red-500'>
						<h4 className='text-4xl'>
							{events.filter((e) => new Date(e.start).toLocaleDateString() === new Date().toLocaleDateString() && e.confirmed === '2').length}
						</h4>
						<p className='flex items-center gap-1'>
							<XCircle size={15} />
							Não Confirmados
						</p>
					</div>
					<div className='flex flex-col items-center text-slate-500'>
						<h4 className='text-4xl'>{events.filter((e) => new Date(e.start).toLocaleDateString() === new Date().toLocaleDateString() && !e.confirmed).length}</h4>
						<p className='flex items-center gap-1'>
							<LucideWifiOff size={15} />
							Não Receberam
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChartConfirm;
