'use client';
import { Button } from '@/components/ui/button';
import { IPlan } from '@/interfaces/iplan';
import FormEditPlan from './FormEditPlan';
import { useState } from 'react';
import { Edit, X } from 'lucide-react';
import FormEditProced from './FormEditProced';

interface Props {
	plan: IPlan;
	setShowDetails: (value: boolean) => void;
}

const PlanDetails = ({ plan, setShowDetails }: Props) => {
	const [editPlan, setEditPlan] = useState<'plan' | 'proced' | null>(null);

	return (
		<div className='fixed left-0 top-0 z-50 grid h-dvh w-dvw place-items-center'>
			{/* Backdrop */}
			<div onClick={() => setShowDetails(false)} aria-label="Fechar modal" className='absolute left-0 top-0 h-screen w-screen bg-black opacity-70'></div>

			<div className='modal relative z-40 max-h-screen w-full overflow-y-auto bg-card md:max-w-[500px] md:rounded md:shadow'>
				<Button title='Fechar' onClick={() => setShowDetails(false)} variant='link' className='absolute right-3 top-3 text-card-foreground duration-300 hover:opacity-70'>
					<X size={15} />
				</Button>

				{!editPlan && (
					<>
						<div className='flex flex-col border-b px-[30px] py-[20px]'>
							<h3 className='text-3xl font-semibold capitalize text-primary'>{plan.name}</h3>
							<p className='font-semibold text-card-foreground'>Cod: {plan.cod}</p>
						</div>
						<div className='flex items-center border-b px-[30px] py-[20px]'>
							<p className='w-[100px] font-medium text-primary md:w-[150px]'>Telefone</p>
							<p className='flex-1 text-card-foreground'>{plan.tel}</p>
						</div>
						<div className='flex border-b px-[30px] py-[20px]'>
							<p className='w-[100px] font-medium text-primary md:w-[150px]'>Email</p>
							<p className='overflow-hidden hyphens-auto break-words text-card-foreground'>{plan.email}</p>
						</div>
						<div className='flex border-b py-[20px] pl-[30px] pr-2'>
							<p className='w-[100px] font-medium text-primary md:w-[150px]'>Observação</p>
							<textarea disabled defaultValue={plan.obs} className='waitList h-32 flex-1 resize-none bg-transparent disabled:text-card-foreground'></textarea>
						</div>
					</>
				)}

				{editPlan === 'plan' && <FormEditPlan plan={plan} setEditPlan={setEditPlan} />}

				{editPlan === 'proced' && <FormEditProced plan={plan} />}

				{!editPlan && (
					<Button onClick={() => setEditPlan('plan')} className='my-4 ml-auto mr-4 flex items-center gap-2'>
						Editar Plano <Edit size={15} />
					</Button>
				)}
			</div>
		</div>
	);
};

export default PlanDetails;
