'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDoctorContext } from '@/context/DoctorContext';
import { usePlansContext } from '@/context/PlansContext';
import { useUserContext } from '@/context/UserContext';
import useCombo from '@/hooks/useCombo';
import usePatients from '@/hooks/usePatients';
import { IEvent } from '@/interfaces/event';
import { IPatient } from '@/interfaces/patients';
import { IUser } from '@/interfaces/user';
import { SelectValue } from '@radix-ui/react-select';
import { ArrowLeftIcon, Edit2Icon, Loader2Icon, User2Icon } from 'lucide-react';
import { useState } from 'react';
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import SearchPatient from './SearchPatient';

/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	preEvent: IEvent;
	setOpen: (value: boolean) => void;
	setFormCreate: (value: boolean) => void;
	setShowDetails: (value: boolean) => void;
	setValue: UseFormSetValue<IEvent & { date: string }>;
	register: UseFormRegister<IEvent & { date: string }>;
	watch: UseFormWatch<IEvent & { date: string }>;
	handleSubmit: UseFormHandleSubmit<IEvent & { date: string }>;
}

const FormEditEvent = ({ setValue, register, watch, handleSubmit, preEvent, setOpen, setFormCreate, setShowDetails }: Props) => {
	const { plans } = usePlansContext();
	const { doctors } = useDoctorContext();
	const { user } = useUserContext();

	const { searchPatients, patients } = usePatients();
	const { updateEditEvent, loading } = useCombo();

	const [search, setSearch] = useState<boolean>(false);

	// Editar Evento
	const handleEdit = (data: IEvent & { date: string }) => {
		const formattedDate = data.date.split('/').reverse().join('-');
		data.start = new Date(formattedDate + 'T' + data.start + ':00');
		data.end = new Date(formattedDate + 'T' + data.end + ':00');
		updateEditEvent(data, setOpen);
	};

	// Pesquisar paciente ao digitar nome no input
	const handleSearch = (value: string) => {
		if (value.length > 3) {
			if (isNaN(Number(value))) {
				const data = { name: value.trim(), cpf: '' };
				searchPatients(data);
			} else {
				const data = { name: '', cpf: value.trim() };
				searchPatients(data);
			}
			setSearch(true);
		} else {
			setSearch(false);
		}
	};

	// Selecionar paciente pesquisado no input
	const selectPatient = (patient: IPatient) => {
		setValue('patientId', patient._id);
		setValue('title', patient.name);
		setValue('phone', patient.phone);
		setValue('patientNasc', new Date(patient.nasc).toISOString().split('T')[0]);
		setValue('plan', patient.plan);
		setValue('planNumber', patient.planNumber);
		watch('plan')
		setSearch(false);
	};

	return (
		<form onSubmit={handleSubmit(handleEdit)} className='flex flex-col gap-4'>
			{/* Id */}
			<div className='relative flex items-center gap-1 text-sm italic text-accent-foreground'>
				<Label className=' ' htmlFor='patientId'>
					Id:
				</Label>
				<input type='text' id='patientId' disabled {...register('patientId')} defaultValue={preEvent.patientId} className=' block flex-1 w-max bg-transparent italic' />
				{!preEvent.patientId && (
					<Button variant={'secondary'} type='button' onClick={() => setFormCreate(true)} className='ml-auto flex gap-2'>
						Novo Cadastro
						<User2Icon size={14} />
					</Button>
				)}
			</div>

			{/* Nome */}
			<div className='relative -mt-2 flex flex-col gap-1'>
				<Label className='text-sm text-accent-foreground' htmlFor='title'>
					Paciente:
				</Label>
				<Input id='title' {...register('title', { required: true })} className='capitalize' onChange={(e) => handleSearch(e.target.value)} />
				{search && patients && (
					<SearchPatient
						patients={patients}
						selectPatient={selectPatient}
						setSearch={setSearch}
						className='absolute top-[105%] z-50 flex max-h-52 w-full flex-col gap-2 overflow-y-auto rounded border bg-background p-2 shadow-xl'
					/>
				)}
			</div>

			{/* Nascimento e Telefone */}
			<div className='flex justify-between gap-4'>
				<div className='flex flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='nasc'>
						Nascimento:
					</Label>

					<Input id='day' type='date' {...register('patientNasc')} />
				</div>

				<div className='flex flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='phone'>
						Telefone:
					</Label>
					<Input id='phone' maxLength={11} minLength={10} defaultValue={preEvent.phone} {...register('phone', { required: true })} />
				</div>
			</div>

			{/* Plano e Número do Plano */}
			<div className='flex items-start justify-between gap-4'>
				<div className='flex flex-1 flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='plan'>
						Plano de Saude:
					</Label>
					
					<Select value={watch('plan')} onValueChange={(value) => setValue('plan', value)} {...register('plan', { required: 'Selecionarplano' })} required>
						<SelectTrigger id='plan' className='capitalize'>
							<SelectValue placeholder='Selecione o plano' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{plans?.map((plan) => (
									<SelectItem key={plan._id} value={plan._id} className='capitalize'>
										{plan.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className='flex flex-1 flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='title'>
						Número da Plano:
					</Label>
					<Input id='title' defaultValue={preEvent.planNumber} {...register('planNumber', { required: true })} />
				</div>
			</div>

			{/* Tipo de Consulta */}
			<div className='flex flex-col gap-1'>
				<Label className='text-sm text-accent-foreground' htmlFor='type'>
					Tipo de Consulta:
				</Label>
				<Select
					defaultValue={preEvent.type}
					onValueChange={(value) => setValue('type', value as 'consulta' | 'retorno' | 'exame' | 'cirurgia' | 'bloqueado')}
					{...register('type', { required: 'Selecione um médico' })}>
					<SelectTrigger id='type'>
						<SelectValue placeholder='Selecione o médico' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='consulta'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-[#5d93b7]'></span>
									Consulta
								</div>
							</SelectItem>
							<SelectItem value='retorno'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-[#64bdac]'></span>
									Retorno
								</div>
							</SelectItem>
							<SelectItem value='exame'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-[#d36cb5]'></span>
									Exame
								</div>
							</SelectItem>
							<SelectItem value='cirurgia'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-[#c35e5e]'></span>
									Cirurgia
								</div>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{/* Médico */}
			<div className='flex flex-col gap-1'>
				<Label className='text-sm text-accent-foreground' htmlFor='doctor'>
					Médico:
				</Label>
				<Select defaultValue={preEvent.doctor} onValueChange={(value) => setValue('doctor', value)} {...register('doctor', { required: 'Selecionar médico' })}>
					<SelectTrigger id='doctor' className='capitalize'>
						<SelectValue placeholder='Selecione o médico' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{user?.role === 'doctor' ? (
								<SelectItem value={user._id} className='capitalize'>
									{user.name}
								</SelectItem>
							) : (
								doctors?.map((e: IUser) => (
									<SelectItem key={e._id} value={e._id} className='capitalize'>
										{e.name}
									</SelectItem>
								))
							)}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{/* Data */}
			<div className='flex flex-wrap justify-between'>
				<div className='flex flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='day'>
						Dia:
					</Label>
					<Input id='day' type='date' {...register('date')} />
				</div>

				<div className='flex flex-col gap-1'>
					<Label className='text-sm text-accent-foreground' htmlFor='hour'>
						Horário:
					</Label>
					<div className='flex items-center gap-2'>
						<Input type='time' id='hour' {...register('start')} />
						até
						<Input type='time' {...register('end')} />
					</div>
				</div>
			</div>

			{/* Observação */}
			<div className='grid gap-1'>
				<Label className='text-sm text-accent-foreground' htmlFor='obs'>
					Obsevação:
				</Label>
				<Textarea className='waitList resize-none px-2 py-1' spellCheck='false' defaultValue={preEvent.obs} {...register('obs')} />
			</div>

			{/* Botões */}
			<div className='flex justify-between gap-4'>
				<Button type='button' variant='ghost' onClick={() => setShowDetails(true)} className='flex items-center gap-1'>
					<ArrowLeftIcon size={12} />
					Voltar
				</Button>
				{loading && (
					<Button type='button' disabled className='flex items-center gap-2'>
						<Loader2Icon className='animate-spin' />
						Alterando...
					</Button>
				)}
				{!loading && (
					<Button type='submit' className='flex items-center gap-1'>
						Confirmar Alteração <Edit2Icon size={12} />
					</Button>
				)}
			</div>
		</form>
	);
};

export default FormEditEvent;
