'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctorContext } from '@/context/DoctorContext';
import { usePlansContext } from '@/context/PlansContext';
import useEvents from '@/hooks/useEvents';
import usePatients from '@/hooks/usePatients';
import { IEvent } from '@/interfaces/event';
import { IPatient } from '@/interfaces/patients';
import { IUser } from '@/interfaces/user';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { Loader2, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormCreatePatient from './FormCreatPatient';
import SearchPatient from './SearchPatient';
import { Textarea } from '@/components/ui/textarea';
import { useUserContext } from '@/context/UserContext';

interface Props {
	preEvent: DateSelectArg;
	open: boolean;
	setOpen: (value: boolean) => void;
}

/* eslint-disable react-hooks/exhaustive-deps */

const ModalCreateEvent = ({ preEvent, open, setOpen }: Props) => {
	const { register, handleSubmit, reset, setValue, watch } = useForm<IEvent & { date: string }>();

	const { createEvent, loading } = useEvents({ setOpen });

	const { patients, searchPatients } = usePatients();

	const { doctors } = useDoctorContext();

	const { plans } = usePlansContext();

	const { user } = useUserContext();

	const [search, setSearch] = useState<boolean>(false);

	const [formCreate, setFormCreate] = useState<boolean>(false);

	const [isBlocked, setIsBlocked] = useState<boolean>(false);

	useEffect(() => {
		reset();
		setValue('start', new Date(preEvent.startStr).toLocaleTimeString()); // set default value no input da hora
		setValue('end', new Date(preEvent.endStr).toLocaleTimeString()); // set default value no input da hora
	}, [open]);

	const handleCreateEvent = (data: IEvent & { date: string }) => {
		data.start = new Date(data.date + ' ' + data.start);
		data.end = new Date(data.date + ' ' + data.end);
		data.status = isBlocked ? 'bloqueado' : 'agendado';
		createEvent(data);
	};

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

	const selectPatient = (patient: IPatient) => {
		setValue('patientId', patient._id);
		setValue('title', patient.name);
		setValue('phone', patient.phone);
		setValue('patientNasc', new Date(patient.nasc).toISOString().split('T')[0]);
		setValue('plan', patient.plan);
		setValue('planNumber', patient.planNumber);
		setSearch(false);
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='max-h-screen overflow-y-auto'>
					<DialogHeader>
						<DialogTitle className='text-primary'> {formCreate ? 'Criar Cadastro' : isBlocked ? 'Criar Bloqueio' : 'Criar Agendamento'}</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					{formCreate && <FormCreatePatient setFormCreate={setFormCreate} />}

					{!formCreate && doctors && plans && user && (
						<form className='flex flex-col gap-4' onSubmit={handleSubmit(handleCreateEvent)}>
							<div className='-my-4 flex justify-end gap-2'>
								<input
									type='checkbox'
									id='block'
									onChange={(e) => {
										setValue('title', '');
										setIsBlocked(e.target.checked);
									}}
								/>
								<label htmlFor='block' className='cursor-pointer hover:opacity-70 duration-300'>
									Bloquear
								</label>
							</div>

							{isBlocked && (
								<div className='relative flex flex-col gap-1'>
									<label className='text-sm text-accent-foreground' htmlFor='title'>
										Motivo:
									</label>
									<Input id='title' {...register('title')} className='capitalize' required />
								</div>
							)}

							{!isBlocked && (
								<>
									{/* Id */}
									<div className='relative flex items-center gap-1 text-sm italic text-accent-foreground'>
										<label className=' ' htmlFor='patientId'>
											Id:
										</label>
										<input type='text' id='patientId' disabled {...register('patientId')} className='w-max bg-transparent italic' />
										<Button variant={'secondary'} type='button' onClick={() => setFormCreate(true)} className='ml-auto flex gap-2'>
											Novo Cadastro
											<User2 size={14} />
										</Button>
									</div>

									{/* Nome */}
									<div className='relative flex flex-col gap-1'>
										<label className='text-sm text-accent-foreground' htmlFor='title'>
											Paciente:
										</label>
										<Input id='title' {...register('title')} required onChange={(e) => handleSearch(e.target.value)} className='capitalize' />
										{search && patients && (
											<SearchPatient
												patients={patients}
												selectPatient={selectPatient}
												setSearch={setSearch}
												className='absolute top-[105%] z-50 flex max-h-52 w-full flex-col gap-2 overflow-y-auto rounded border bg-background p-2 shadow-xl'
											/>
										)}
									</div>

									{/* Nascimento */}
									<div className='flex justify-between gap-4'>
										<div className='flex flex-col gap-1'>
											<label className='text-sm text-accent-foreground' htmlFor='nasc'>
												Nascimento:
											</label>

											<Input id='nasc' type='date' {...register('patientNasc')} required />
										</div>

										<div className='flex flex-col gap-1'>
											<label className='text-sm text-accent-foreground' htmlFor='phone'>
												Telefone:
											</label>
											<Input id='phone' maxLength={11} minLength={10} {...register('phone')} required />
										</div>
									</div>

									{/* Plano e Número do Plano */}
									<div className='flex justify-between gap-4'>
										<div className='flex flex-1 flex-col gap-1'>
											<label className='text-sm text-accent-foreground' htmlFor='plan'>
												Plano de Saude:
											</label>
											<Select value={watch('plan')} onValueChange={(value) => setValue('plan', value)} {...register('plan')} required>
												<SelectTrigger id='plan' className='capitalize'>
													<SelectValue placeholder='Selecionar plano' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{plans.map((plan) => (
															<SelectItem key={plan._id} value={plan._id} className='capitalize'>
																{plan.name}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>

										<div className='flex flex-1 flex-col gap-1'>
											<label className='text-sm text-accent-foreground' htmlFor='title'>
												Número da Plano:
											</label>
											<Input id='title' {...register('planNumber')} required />
										</div>
									</div>

									{/* Tipo de Consulta */}
									<div className='flex flex-col gap-1'>
										<label className='text-sm text-accent-foreground' htmlFor='type'>
											Tipo de Consulta:
										</label>
										<Select onValueChange={(value) => setValue('type', value as 'consulta' | 'retorno' | 'exame' | 'cirurgia')} {...register('type')} required>
											<SelectTrigger id='type' className='capitalize'>
												<SelectValue placeholder='Tipo de consulta' />
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
								</>
							)}

							{/* Médico */}
							<div className='flex flex-col gap-1'>
								<label className='text-sm text-accent-foreground' htmlFor='doctor'>
									Médico:
								</label>
								<Select onValueChange={(value) => setValue('doctor', value)} {...register('doctor', { required: true })} required>
									<SelectTrigger id='doctor' className='capitalize'>
										<SelectValue placeholder='Selecionar médico' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{user.role === 'doctor' ? (
												<SelectItem value={user._id} className='capitalize'>
													{user.name}
												</SelectItem>
											) : (
												doctors.map((e: IUser) => (
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
									<label className='text-sm text-accent-foreground' htmlFor='day'>
										Dia:
									</label>
									<Input id='day' type='date' defaultValue={new Date(preEvent.start).toISOString().split('T')[0]} {...register('date')} />
								</div>

								<div className='flex flex-col gap-1'>
									<label className='text-sm text-accent-foreground' htmlFor='hour'>
										Horário:
									</label>
									<div className='flex items-center gap-2'>
										<Input type='time' id='hour' {...register('start')} />
										até
										<Input type='time' {...register('end')} />
									</div>
								</div>
							</div>

							{/* Observação */}
							<div className='grid gap-1'>
								<label className='text-sm text-accent-foreground' htmlFor='obs'>
									Obsevação:
								</label>
								<Textarea className='waitList resize-none px-2 py-1' spellCheck='false' {...register('obs')} />
							</div>

							{/* Botões */}
							{loading && (
								<Button type='button' disabled className='flex gap-2'>
									<Loader2 className='animate-spin' />
									Agendando...
								</Button>
							)}

							{!loading && <Button type='submit'>{isBlocked ? 'Bloquear' : 'Agendar'}</Button>}
						</form>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ModalCreateEvent;
