'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDoctorContext } from '@/context/DoctorContext';
import { usePlansContext } from '@/context/PlansContext';
import useEvents from '@/hooks/useEvents';
import { IEvent, IEventStatus } from '@/interfaces/event';
import calculeAge from '@/utils/calculeAge';
import { Calendar, CheckCheck, CheckCheckIcon, ChevronDown, Delete, Edit2, Info, Phone, User2, UserCheck2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormCreatePatient from './FormCreatPatient';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@radix-ui/react-tooltip';
import { useUserContext } from '@/context/UserContext';
import FormEditEvent from './FormEditEvent';

interface Props {
	preEvent: IEvent;
	open: boolean;
	setOpen: (value: boolean) => void;
}

/* eslint-disable react-hooks/exhaustive-deps */

const ModalEdit = ({ preEvent, open, setOpen }: Props) => {
	const { register, watch, handleSubmit, setValue, getValues, reset } = useForm<IEvent & { date: string }>();

	const { eventDelete, eventChangeStatus, changeConfirmed } = useEvents({ setOpen });

	const { user } = useUserContext();

	const { doctors } = useDoctorContext();

	const { plans } = usePlansContext();

	const [showDetails, setShowDetails] = useState<boolean>(true);

	const [formCreate, setFormCreate] = useState<boolean>(false);

	useEffect(() => {
		reset();
		setValue('_id', preEvent._id);
		setValue('blocked', preEvent.blocked);
		setValue('title', preEvent.title);
		setValue('patientNasc', new Date(preEvent.patientNasc).toISOString().split('T')[0]);
		setValue('patientId', preEvent.patientId);
		setValue('phone', preEvent.phone);
		setValue('plan', preEvent.plan);
		setValue('doctor', preEvent.doctor);
		setValue('status', preEvent.status);
		setValue('start', new Date(preEvent.start).toLocaleTimeString().slice(0, 5));
		setValue('end', new Date(preEvent.end).toLocaleTimeString().slice(0, 5));
		setValue('date', new Date(preEvent.start).toISOString().split('T')[0]);
		setValue('type', preEvent.type);
	}, [open]);

	// Confirmar chegada do paciente
	const handleConfirm = (value: IEventStatus) => {
		setValue('status', value);
		const data = getValues();
		eventChangeStatus(data, preEvent);
		setOpen(false);
	};

	const [openConfirmed, setOpenConfirmed] = useState<boolean>(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='max-h-screen overflow-y-auto'>
				<DialogHeader>
					{showDetails && <DialogTitle>Dados do Agendamento</DialogTitle>}
					{!showDetails && <DialogTitle className='text-primary'> {formCreate ? 'Criar Cadastro' : 'Editar Agendamento'}</DialogTitle>}
				</DialogHeader>

				{showDetails && plans && doctors && (
					<>
						{/* Nome, plano e Confirmação de WPP */}
						<div className='flex items-center gap-4'>
							<div className='grid h-14 w-14 place-items-center rounded-full bg-accent'>
								{preEvent.patientId ? <UserCheck2Icon size={25} color='#22c55e' className='ml-1' /> : <User2 size={25} />}
							</div>
							<div className='flex-1'>
								{preEvent.patientId && (
									<Link href={`/atend?id=${preEvent.patientId}`} className='w-max cursor-pointer text-lg capitalize text-primary duration-300 hover:opacity-70'>
										{preEvent.title}
									</Link>
								)}
								{!preEvent.patientId && <h3 className='text-lg capitalize text-primary'>{preEvent.title}</h3>}

								<p className='flex items-center gap-2 text-sm capitalize'>{plans.find((plan) => plan._id === preEvent.plan)?.name}</p>

								<div className='flex w-full justify-between' >
									<Popover open={openConfirmed} onOpenChange={() => setOpenConfirmed(!openConfirmed)} >
										<PopoverTrigger asChild>
											<Button className='h-max space-x-1 bg-transparent p-0 shadow-none hover:bg-transparent' >
												{preEvent.confirmed === '0' && <span className='text-sm text-slate-500'>Sem Resposta</span>}
												{preEvent.confirmed === '1' && <span className='text-sm text-green-500'>Confirmado</span>}
												{preEvent.confirmed === '2' && <span className='text-sm text-red-500'>Não Confirmado</span>}
												<ChevronDown size={15} className='text-muted-foreground' />
											</Button>
										</PopoverTrigger>
										<PopoverContent className='flex w-max flex-col gap-1 rounded p-1' style={preEvent.status === 'bloqueado' ? { display: 'none' } : {}}>
											<Button
												onClick={() => {
													changeConfirmed(preEvent, '1');
													setOpenConfirmed(false);
												}}
												className='bg-transparent text-sm text-green-500 shadow-none hover:bg-muted'>
												Confirmado
											</Button>
											<Button
												onClick={() => {
													changeConfirmed(preEvent, '0');
													setOpenConfirmed(false);
												}}
												className='bg-transparent text-sm text-slate-500 shadow-none hover:bg-muted'>
												Sem Resposta
											</Button>
											<Button
												onClick={() => {
													changeConfirmed(preEvent, '2');
													setOpenConfirmed(false);
												}}
												className='bg-transparent text-sm text-red-500 shadow-none hover:bg-muted'>
												Não Confirmado
											</Button>
										</PopoverContent>
									</Popover>

									<TooltipProvider delayDuration={150}>
										<Tooltip >
											<TooltipTrigger  className='ml-auto block'>
												<Info size={15} style={preEvent.obs ? { color: '#3398db' } : { color: '#555' }} />
											</TooltipTrigger>
											<TooltipContent className='max-h-40 max-w-80 overflow-hidden rounded border bg-card text-sm text-card-foreground shadow-xl'>
												<h4 className='text-md py-1 text-primary'>Observação:</h4>
												{preEvent.obs?.split('\n').map((item, index) => <p key={index}>{item}</p>)}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						</div>

						{/* Telefone e aniversário */}
						{preEvent.status != 'bloqueado' && (
							<div className='flex flex-wrap justify-between text-sm'>
								{preEvent.phone.length === 11 && (
									<Link
										href={`https://wa.me/55${preEvent.phone}`}
										target='_blank'
										title='WhatsApp'
										className='flex items-center gap-2 duration-300 hover:opacity-70'>
										<Phone size={14} />
										{`(${preEvent.phone.slice(0, 2)}) ${preEvent.phone.slice(2, 3)} ${preEvent.phone.slice(3, 7)}-${preEvent.phone.slice(7)}`}
									</Link>
								)}
								{preEvent.phone.length === 10 && (
									<Link title='Fixo' href={`#`} className='flex items-center gap-2 duration-300'>
										<Phone size={14} />
										{`(${preEvent.phone.slice(0, 2)}) ${preEvent.phone.slice(2, 6)}-${preEvent.phone.slice(6)}`}
									</Link>
								)}
								<div className='flex items-center gap-2'>
									<Calendar size={14} />({calculeAge(preEvent.patientNasc)}) {preEvent.patientNasc.split('T')[0].split('-').reverse().join('/')}
								</div>
							</div>
						)}
						{/* Data */}
						<div className='flex gap-2 text-lg text-primary'>
							<p>{new Date(preEvent.start).toLocaleDateString()}</p>
							<p>-</p>
							<p>{new Date(preEvent.start).toLocaleTimeString().slice(0, 5)}h</p>
						</div>

						{/* Tipo de consulta */}
						<div className='border-y py-4 capitalize'>
							<p>{preEvent.type}</p>
						</div>

						{/* Botões de deletar */}
						<div className='flex flex-wrap justify-end gap-2'>
							<Button
								disabled={preEvent.status === 'agendado' || preEvent.status === 'bloqueado' ? false : true}
								type='button'
								variant='ghost'
								title='Excluir agendamento'
								aria-label='Excluir agendamento'
								onClick={() => eventDelete(preEvent._id as string)}
								className='mr-auto text-destructive'>
								<Delete size={18} />
							</Button>

							{preEvent.status === 'chegada' && (
								<Button type='submit' variant='destructive' onClick={() => handleConfirm('agendado')} className='flex items-center gap-1'>
									Cancelar Chegada
									<CheckCheckIcon size={12} />
								</Button>
							)}

							{preEvent.status === 'atendimento' && (
								<Button type='button' variant='default' className='flex items-center gap-1 bg-yellow-500' disabled>
									Atendimento em andamento
									<CheckCheckIcon size={12} />
								</Button>
							)}

							{preEvent.status === 'atendido' && (
								<Button type='button' variant='default' className='flex items-center gap-1 bg-gray-500' disabled>
									Atendimento concluído
									<CheckCheckIcon size={12} />
								</Button>
							)}

							{preEvent.status === 'agendado' && (
								<>
									<Button type='button' variant={'outline'} onClick={() => setShowDetails(false)} className='flex items-center gap-1'>
										Editar
										<Edit2 size={12} />
									</Button>
									{preEvent.patientId && (
										<Button type='submit' onClick={() => handleConfirm('chegada')} className='flex items-center gap-1'>
											Confirmar Chegada
											<CheckCheck size={15} />
										</Button>
									)}
								</>
							)}
						</div>
					</>
				)}

				{!showDetails && plans && doctors && user && (
					<>
						{!formCreate && (
							<FormEditEvent
								setValue={setValue}
								register={register}
								handleSubmit={handleSubmit}
								watch={watch}
								preEvent={preEvent}
								setOpen={setOpen}
								setFormCreate={setFormCreate}
								setShowDetails={setShowDetails}
							/>
						)}

						{formCreate && <FormCreatePatient setFormCreate={setFormCreate} />}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ModalEdit;
