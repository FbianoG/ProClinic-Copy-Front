'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useDoctorContext } from '@/context/DoctorContext';
import { useUserContext } from '@/context/UserContext';
import { IMedicalRecord } from '@/interfaces/medicalRecord';
import { IUser } from '@/interfaces/user';
import { setDoctor } from '@/utils/setDoctor';
import { ChevronDown, ChevronLeft, Info } from 'lucide-react';
import { useState } from 'react';

interface Props {
	event: IMedicalRecord;
}

const MedicalRecordItem = ({ event }: Props) => {
	const { doctors } = useDoctorContext();
	const { user } = useUserContext();

	const [expand, setExpand] = useState<boolean>(false);

	const handleExpand = () => {
		if (expand) {
			setExpand(false);
		} else {
			setExpand(true);
		}
	};

	return (
		<li className='max-h-20 w-full overflow-hidden rounded border bg-card p-4 duration-500' style={{ maxHeight: expand ? '2000px' : '' }}>
			<div onClick={user?.role !== 'recep' ? handleExpand : undefined} className='flex cursor-pointer items-center justify-between border-b pb-4'>
				<div>
					<div className='flex items-center gap-4'>
						<h5 className='font-bold text-foreground'>{new Date(event.date).toLocaleString().slice(0, 17)}h</h5>
						<div className='relative flex w-max gap-1'>
							<Info size={15} color='#3498db' className='peer duration-300 hover:opacity-70' />
							<div className='absolute -top-4 left-[150%] hidden min-w-max flex-col gap-y-0 rounded border bg-accent p-2 text-xs peer-hover:flex'>
								<span className=''>Chegada: {new Date(event.dateConfirm).toLocaleString().slice(0, 17)}h</span>
								<span className=''>Início: {new Date(event.dateStart).toLocaleString().slice(0, 17)}h</span>
								<span className=''>Fim: {new Date(event.dateEnd).toLocaleString().slice(0, 17)}h</span>
							</div>
						</div>
					</div>
					<h3 className='capitalize'>Dr. {setDoctor(event.doctorId, doctors as IUser[])?.name}</h3>
				</div>

				{user?.role !== 'recep' && !expand && (
					<Button variant='link' onClick={handleExpand}>
						<ChevronLeft />
					</Button>
				)}
				{user?.role !== 'recep' && expand && (
					<Button variant='link' onClick={handleExpand}>
						<ChevronDown />
					</Button>
				)}
			</div>

			{user?.role !== 'recep' && (
				<div className='mt-6 flex flex-col gap-4'>
					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Queixa principal:</Label>
						{event.complaint?.split('\n').map((e) => (
							<p className='text-sm leading-3' key={e + '1'}>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>História da moléstia atual:</Label>
						{event.currentHistory?.split('\n').map((e) => (
							<p key={e + '2'} className='text-sm leading-4'>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Histórico e antecedentes:</Label>
						{event.medicalHistory?.split('\n').map((e) => (
							<p key={e + '3'} className='text-sm leading-4'>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Exame físico:</Label>
						{event.physicalExam?.split('\n').map((e) => (
							<p key={e + '4'} className='text-sm leading-4'>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Hipótese diagnóstica:</Label>
						{event.diagnostic?.split('\n').map((e, index) => (
							<p key={e + index} className='text-sm leading-4'>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Condutas:</Label>
						{event.conduct?.split('\n').map((e) => (
							<p key={e + '6'} className='leading- text-sm'>
								{e}
							</p>
						))}
					</div>

					<div className='grid w-full gap-1.5'>
						<Label className='mb-1 mt-2 font-bold'>Prescrição:</Label>
						{event.prescription?.split('\n').map((e) => (
							<p key={e + '7'} className='text-sm leading-4'>
								{e}
							</p>
						))}
					</div>
				</div>
			)}
		</li>
	);
};

export default MedicalRecordItem;
