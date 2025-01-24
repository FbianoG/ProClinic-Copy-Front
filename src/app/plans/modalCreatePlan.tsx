'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { IPlan } from '@/interfaces/iplan';
import usePlans from '@/hooks/usePlans';
import { FileCheck2Icon, Loader2, Plus, X } from 'lucide-react';

interface PropsInputs extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
	input: keyof IPlan;
}

const ModalCreatePlan = () => {
	const { register, handleSubmit, reset } = useForm<IPlan>();

	const { createPlan, loading } = usePlans();

	const [modal, setModal] = useState<boolean>(false);

	const handleCreatePlan = (data: IPlan) => createPlan(data, setModal, reset);

	const showModal = () => {
		if (modal) setModal(false);
		else setModal(true);
	};

	const Inputs = ({ title, input, ...rest }: PropsInputs) => (
		<div className='flex items-center gap-2'>
			<Label id={input} className='text-md w-24 font-medium capitalize text-primary'>{title}:</Label>
			<Input className='h-7' {...register(input)} {...rest} />
		</div>
	);

	return (
		<>
			<Button onClick={showModal} className='flex w-max items-center gap-2 md:ml-auto'>
				Adicionar Plano
				<Plus size={15} />
			</Button>

			{modal && (
				<>
					<div className='fixed left-0 top-0 z-50 h-screen w-screen bg-black opacity-70'></div>

					<form
						onSubmit={handleSubmit(handleCreatePlan)}
						className='modal fixed left-1/2 top-1/2 z-50 flex w-full h-auto md:w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 md:gap-4 rounded bg-card p-4 shadow-lg duration-500'>
						<h2 className='my-4 text-center text-2xl font-medium text-primary'>Cadastrar Plano</h2>

						<Button title='Fechar' variant={'link'} onClick={showModal} className='absolute right-3 top-3 text-card-foreground duration-300 hover:opacity-70'>
							<X size={15} />
						</Button>

						<Inputs title='plano' input='name' required />
						<Inputs title='login' input='login' />
						<Inputs title='senha' input='password' />
						<Inputs title='site' input='web' />
						<Inputs title='imagem (logo)' input='src' />
						<Inputs title='cód. prestador' input='cod' />
						<Inputs title='telefone' input='tel' />
						<Inputs title='e-mail' input='email' />

						<div className=''>
							<Label className='text-md w-24 font-medium text-primary'>Observação:</Label>
							<Textarea className='md:h-40 resize-none h-10 ' {...register('obs')} />
						</div>

						<div className='my-2 ml-auto w-max'>
							{loading && (
								<Button disabled className='flex gap-2'>
									<Loader2 size={14} className='animate-spin' /> Criando...
								</Button>
							)}
							{!loading && (
								<Button className='flex items-center gap-2'>
									Criar Plano <FileCheck2Icon size={15} />
								</Button>
							)}
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default ModalCreatePlan;
