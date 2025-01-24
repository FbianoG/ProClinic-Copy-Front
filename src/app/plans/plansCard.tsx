'use client';
import { IPlan } from '@/interfaces/iplan';
import { FolderOpenIcon, Link } from 'lucide-react';
import { useState } from 'react';
import { Toast } from '@/utils/Toast';
import PlanDetails from './PlanDetails';

interface Props {
	plan: IPlan;
}

const PlansCard = ({ plan }: Props) => {
	const [showDetails, setShowDetails] = useState<boolean>(false);

	const copyText = (text: string | undefined) => {
		if (!text) return;
		navigator.clipboard.writeText(text); // Copia texto ao clicar
		Toast(text, 'Texto copiado.', 'ℹ️');
	};
	return (
		<>
			<li className='relative flex w-[260px] flex-col gap-2 rounded bg-card p-2 shadow duration-300 hover:shadow-md'>
				<h3 className='max-w-[190px] overflow-hidden whitespace-nowrap text-xl font-medium capitalize text-primary'>{plan.name}</h3>
				<div className='flex gap-1 text-xs'>
					<p className='text-green-500'>Login:</p>
					<p onClick={() => copyText(plan.login)} className='cursor-pointer text-foreground duration-300 hover:underline hover:opacity-70'>
						{plan.login}
					</p>
				</div>
				<div className='flex gap-1 text-xs'>
					<p className='text-green-500'>Senha:</p>
					<p onClick={() => copyText(plan.password)} className='cursor-pointer text-foreground duration-300 hover:underline hover:opacity-70'>
						{plan.password}
					</p>
				</div>
				<div className='absolute right-0 top-0 flex gap-3 p-2 text-primary'>
					<button
						title='Dados do plano'
						onClick={() => {
							setShowDetails(true);
						}}
						className='duration-300 hover:opacity-50'>
						<FolderOpenIcon size={20} />
					</button>
					{plan.web && (
						<button title='Acessar Site' onClick={() => window.open(`${plan.web}`, '_blank')} className='duration-300 hover:opacity-50'>
							<Link size={20} />
						</button>
					)}
					{!plan.web && (
						<button title='Não possui site' className='duration-300 hover:opacity-50'>
							<Link size={20} />
						</button>
					)}
				</div>
			</li>
			{showDetails && <PlanDetails plan={plan} setShowDetails={setShowDetails} />}
		</>
	);
};

export default PlansCard;
