'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctorContext } from '@/context/DoctorContext';
import useCombo from '@/hooks/useCombo';
import { cn } from '@/lib/utils';
import { CalendarMinus2Icon, FileSpreadsheet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const FormReports = ({}) => {
	const { handleSubmit, setValue } = useForm<{ type: string; doctor: string; start: Date; end: Date }>();

	const { getReports } = useCombo();

	const { doctors } = useDoctorContext();

	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	useEffect(() => {
		if (!startDate || !endDate) return;
		setValue('start', startDate);
		setValue('end', endDate);
	}, [startDate, endDate]);

	return (
		<form onSubmit={handleSubmit(getReports as any)} className='flex gap-4'>
			{/* <Select
				onValueChange={(value) => {
					setValue('type', value);
				}}>
				<SelectTrigger id='plan' className='w-max rounded border-none bg-card capitalize shadow'>
					<SelectValue placeholder='Selecionar tipo' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='plan' className='capitalize'>
							Por Plano
						</SelectItem>
						<SelectItem value='type' className='capitalize'>
							Por Procedimento
						</SelectItem>
						<SelectItem value='status' className='capitalize'>
							Por Status
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select> */}

			<Select
				onValueChange={(value) => {
					setValue('doctor', value);
				}}>
				<SelectTrigger id='doctor' className='w-max rounded border-none bg-card capitalize shadow'>
					<SelectValue placeholder='Selecionar médico' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='todos' className='capitalize'>
							Todos
						</SelectItem>
						{doctors?.map((e) => (
							<SelectItem key={e._id} value={e._id} className='capitalize'>
								{e.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			<div className='flex gap-4'>
				<Popover>
					<PopoverTrigger asChild className='w-max rounded border-none bg-card capitalize shadow'>
						<Button variant={'outline'} className={cn('w-max items-center justify-start gap-2 text-left', !startDate && 'text-muted-foreground')}>
							<CalendarMinus2Icon size={15} />
							{startDate?.toLocaleDateString() || <span>Data Inicial</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar mode='single' selected={startDate} onSelect={setStartDate} initialFocus />
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild className='w-max rounded border-none bg-card capitalize shadow'>
						<Button variant={'outline'} className={cn('w-max items-center justify-start gap-2 text-left', !endDate && 'text-muted-foreground')}>
							<CalendarMinus2Icon size={15} />
							{endDate?.toLocaleDateString() || <span>Data Final</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar mode='single' selected={endDate} onSelect={setEndDate} initialFocus />
					</PopoverContent>
				</Popover>
			</div>

			<Button className='flex items-center gap-2'>
				<FileSpreadsheet size={15} />
				Gerar Relatório
			</Button>
		</form>
	);
};

export default FormReports;
