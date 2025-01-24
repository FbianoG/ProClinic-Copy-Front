'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlansContext } from '@/context/PlansContext';
import usePatients from '@/hooks/usePatients';
import { IPatient } from '@/interfaces/patients';
import { ArrowLeftIcon, IdCard, Loader2, LucideBookHeart, Mail, Phone, Plus, User2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
	setFormCreate: (value: boolean) => void;
}

const FormCreatePatient = ({ setFormCreate }: Props) => {
	const { register, handleSubmit, setValue } = useForm<IPatient>();

	const { plans } = usePlansContext();

	const { createPatient, loading } = usePatients();

	const handleCreatePatient = (data: IPatient) => {
		createPatient(data, setFormCreate);
	};

	return (
		<form onSubmit={handleSubmit(handleCreatePatient)} className='flex flex-col gap-4'>
			{/* Nome Completo */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='name'>
					Nome Completo:
				</label>
				<Input id='name' {...register('name')} required />
			</div>

			{/* Nascimento - CPF */}
			<div className='flex justify-between'>
				<div className='flex flex-col gap-1'>
					<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='nasc'>
						Nascimento:
					</label>
					<Input id='nasc' type='date' {...register('nasc')} required />
				</div>
				<div className='flex flex-col gap-1'>
					<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='cpf'>
						CPF:
					</label>
					<Input id='cpf' {...register('cpf')} maxLength={11} />
				</div>
			</div>

			{/* Nome da mãe */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='mother'>
					<User2Icon size={12} />
					Nome da Mãe:
				</label>
				<Input id='mother' {...register('mother')} required />
			</div>

			{/* Gênero */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='gender'>
					<User2Icon size={12} />
					Gênero:
				</label>
				<Select onValueChange={(value: 'mas' | 'fem') => setValue('gender', value)} {...register('gender', { required: 'Selecione o gênero' })} required>
					<SelectTrigger id='gender' className='capitalize'>
						<SelectValue placeholder='Selecionar gênero' />
					</SelectTrigger>
					<SelectContent className='capitalize'>
						<SelectGroup>
							<SelectItem value='mas'>
								<div className='flex items-center gap-2'>
									<User2Icon size={12} color='#0973dc' />
									Masculino
								</div>
							</SelectItem>
							<SelectItem value='fem' className='flex items-center gap-2'>
								<div className='flex items-center gap-2'>
									<User2Icon size={12} color='#dd61a6' />
									Feminino
								</div>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{/* Telefone */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='phone'>
					<Phone size={12} />
					Telefone:
				</label>
				<Input id='phone' type='tel' maxLength={11} minLength={10} {...register('phone')} required />
			</div>

			{/* E-mail */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='email'>
					<Mail size={12} />
					E-mail (opcional):
				</label>
				<Input id='email' {...register('email')} />
			</div>

			{/* Plano */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='plan'>
					<LucideBookHeart size={12} />
					Plano:
				</label>
				<Select onValueChange={(value) => setValue('plan', value)} {...register('plan', { required: 'Selecione o plano' })} required>
					<SelectTrigger id='plan'>
						<SelectValue placeholder='Selecione o plano' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{plans &&
								plans.map((plan) => (
									<SelectItem key={plan._id} value={plan._id} className='capitalize'>
										{plan.name}
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{/* Carteirinha */}
			<div className='flex flex-col gap-1'>
				<label className='flex items-center gap-1 text-sm text-accent-foreground' htmlFor='planNumber'>
					<IdCard size={12} />
					Número da Carteirinha:
				</label>
				<Input id='planNumber' {...register('planNumber')} required />
			</div>

			{/* Botões */}
			<div className='flex justify-between'>
				<Button variant='ghost' onClick={() => setFormCreate(false)} className='flex gap-2'>
					<ArrowLeftIcon size={12} />
					Voltar
				</Button>
				{!loading && (
					<Button className='flex gap-2'>
						Criar Cadastro <Plus size={14} />
					</Button>
				)}
				{loading && (
					<Button disabled className='flex gap-2'>
						Criando <Loader2 size={14} className='animate-spin' />
					</Button>
				)}
			</div>
		</form>
	);
};

export default FormCreatePatient;
