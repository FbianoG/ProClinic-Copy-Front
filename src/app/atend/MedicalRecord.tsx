'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserContext } from '@/context/UserContext';
import { IEvent } from '@/interfaces/event';
import { IMedicalRecord } from '@/interfaces/medicalRecord';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import MedicalRecordItem from './MedicalRecordItem';
import useMedicalRecord from '@/hooks/useMedicalRecord';
import { useDoctorContext } from '@/context/DoctorContext';
import { Loader2 } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	medicalRecords: IMedicalRecord[];
	setMedicalRecords: (value: IMedicalRecord[]) => void;
	eventActive: IEvent | null;
	setEventActive: (value: IEvent | null) => void;
	showEventActive: boolean;
	setShowEventActive: (value: boolean) => void;
	setWEvents: (value: IEvent[]) => void;
	wEvents?: IEvent[];
}

const MedicalRecord = ({ medicalRecords, setMedicalRecords, eventActive, setEventActive, showEventActive, setShowEventActive, setWEvents, wEvents }: Props) => {
	const { handleSubmit, register, reset } = useForm<IMedicalRecord & { eventId: string }>();

	const { user } = useUserContext(); // dados do usuário logado

	const { doctors } = useDoctorContext();

	const { createMedicalRecord } = useMedicalRecord(); // funções para criar e buscar historicos

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (eventActive) setShowEventActive(true);
	}, [eventActive]);

	const handleFinallyEvent = async (data: IMedicalRecord & { eventId: string }) => {
		try {
			if (!wEvents) return;
			setLoading(true);
			if (!eventActive && !medicalRecords) return;
			const res = await createMedicalRecord(data as IMedicalRecord & { eventId: string }, eventActive as IEvent);
			setMedicalRecords([res, ...(medicalRecords as IMedicalRecord[])]);
			setShowEventActive(false);
			setEventActive(null);
			setWEvents(wEvents.filter((e) => e._id !== data.eventId));
			reset();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mt-4 w-full'>
			{/* Atendimento em aberto */}
			{showEventActive && eventActive && (
				<div className='my-8 rounded border bg-card p-4' onSubmit={handleSubmit(handleFinallyEvent)}>
					<h2 className='text-xl font-semibold text-primary'>Atendimento em Andamento</h2>
					<h2 className='font-bold'>{new Date(eventActive.start).toLocaleString().slice(0, 17)}h</h2>
					<h3>por: {user?.name}</h3>
					<form className='mt-6 flex flex-col gap-4'>
						<div className='grid w-full gap-1.5'>
							<Label>Queixa principal:</Label>
							<Textarea className='h-24 resize-none' {...register('complaint')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>História da moléstia atual:</Label>
							<Textarea className='h-24 resize-none' {...register('currentHistory')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>Histórico e antecedentes:</Label>
							<Textarea className='h-24 resize-none' {...register('medicalHistory')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>Exame físico:</Label>
							<Textarea className='h-24 resize-none' {...register('physicalExam')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>Hipótese diagnóstica:</Label>
							<Textarea className='h-24 resize-none' {...register('diagnostic')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>Condutas:</Label>
							<Textarea className='h-24 resize-none' {...register('conduct')} />
						</div>
						<div className='grid w-full gap-1.5'>
							<Label>Prescrição:</Label>
							<Textarea className='h-24 resize-none' {...register('prescription')} />
						</div>

						<div className='flex justify-end gap-4'>
							{loading && (
								<>
									<Button type='button' variant='ghost' disabled>
										Limpar
									</Button>
									<Button type='button' disabled className='flex items-center gap-2'>
										<Loader2 size={15} className='animate-spin' />
										Finalizando...
									</Button>
								</>
							)}
							{!loading && (
								<>
									<Button type='button' variant='ghost' onClick={() => reset()}>
										Limpar
									</Button>
									<Button type='submit'>Finalizar Atendimento</Button>
								</>
							)}
						</div>
					</form>
				</div>
			)}

			{/* Histórico */}
			<h3 className='mt-4 text-xl font-medium text-primary'>Histórico de Atendimentos</h3>
			<ul className='flex flex-col gap-2 pb-12'>
				{doctors && medicalRecords && medicalRecords.length > 0 && medicalRecords.map((event) => <MedicalRecordItem key={event._id} event={event} />)}
				{medicalRecords && medicalRecords.length === 0 && (
					<li key={0} className='mt-4'>
						Paciente não possui atendimento anterior.
					</li>
				)}
			</ul>
		</div>
	);
};

export default MedicalRecord;
