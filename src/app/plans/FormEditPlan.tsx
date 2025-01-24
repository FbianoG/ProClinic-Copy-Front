import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserContext } from '@/context/UserContext';
import usePlans from '@/hooks/usePlans';
import { IPlan } from '@/interfaces/iplan';
import { ArrowLeft, FileTerminalIcon, LoaderCircleIcon, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
/* eslint-disable react-hooks/exhaustive-deps */
interface Props {
	plan: IPlan;
	setEditPlan: (value: 'plan' | 'proced' | null) => void;
}

interface PropsInputs extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
	input: keyof Omit<IPlan, 'tuss'>;
}

const FormEditPlan = ({ plan, setEditPlan }: Props) => {
	const { register, handleSubmit, reset } = useForm<IPlan>();

	const { editPlan, loading } = usePlans();

	const { user } = useUserContext();

	const edit = (data: IPlan) => editPlan(data, plan._id as string, setEditPlan, reset);

	const Inputs = ({ title, input, ...rest }: PropsInputs) => (
		<div className='flex items-center gap-2'>
			<Label className='text-md w-24 font-medium capitalize text-primary'>{title}:</Label>
			<Input className='h-7' defaultValue={plan[input]} {...register(input)} {...rest} />
		</div>
	);

	return (
		<form onSubmit={handleSubmit(edit)} className='flex max-h-full flex-col gap-2 p-4'>
			<h2 className='my-4 text-center text-2xl font-medium text-primary'>Editar Plano</h2>

			<Inputs title='plano' input='name' required />
			<Inputs title='login' input='login' />
			<Inputs title='senha' input='password' />
			<Inputs title='cód. prestador' input='cod' />
			<Inputs title='Telefone' input='tel' />
			<Inputs title='Site' input='web' />
			<Inputs title='imagem (logo)' input='src' />
			<Inputs title='e-mail' input='email' type='email' />

			<div className=''>
				<Label className='text-md w-24 font-medium text-primary'>Observação:</Label>
				<Textarea className='h-40 resize-none' defaultValue={plan.obs} {...register('obs')} />
			</div>

			<div className='my-2 flex justify-between gap-2'>
				<Button type='button' variant={'ghost'} onClick={() => setEditPlan(null)} className='flex items-center gap-2'>
					<ArrowLeft size={12} />
					Voltar
				</Button>
				{user?.role === 'admin' && (
					<Button type='button' variant='secondary' onClick={() => setEditPlan('proced')} className='ml-auto flex items-center gap-2'>
						Tuss
						<FileTerminalIcon size={12} />
					</Button>
				)}

				{!loading && (
					<Button type='submit' className='flex items-center gap-2'>
						Salvar Alterações <Save size={15} />
					</Button>
				)}

				{loading && (
					<Button type='button' disabled className='flex items-center gap-2'>
						<LoaderCircleIcon size={12} className='animate-spin' />
						Salvando...
					</Button>
				)}
			</div>
		</form>
	);
};

export default FormEditPlan;
