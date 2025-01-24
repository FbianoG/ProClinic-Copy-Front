'use client';
import calculeAge from '@/utils/calculeAge';
import {  CalendarDays, FileBadgeIcon, FilePlus2, LucideBookHeart, Phone, User, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import FormGuia from './FormGuia';
import FormReceit from './FormReceit';
import Link from 'next/link';
import { IPatient } from '@/interfaces/patients';
import { usePlansContext } from '@/context/PlansContext';

/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	patient: IPatient;
}
const PatientDetails = ({ patient }: Props) => {
	const { plans } = usePlansContext();

	const [showFormGuia, setShowFormGuia] = useState<boolean>(false);

	const [showFormReceit, setshowFormReceit] = useState<boolean>(false);

	useEffect(()=> { 
		console.log( patient.nasc )
	 }, [])

	return (
		<>
			<div className='flex rounded border bg-card p-4 md:gap-4'>
				<div className='hidden h-20 w-20 place-content-center rounded-full border bg-accent md:grid'>
					<User size={35} />
				</div>
				<div className='flex flex-col text-sm'>
					<h3 className='text-lg font-medium capitalize text-primary'>{patient.name}</h3>
					{/* <span className='text-xs text-accent-foreground'>id: {patient._id}</span> */}
					<div className='flex items-center gap-2'>
						<CalendarDays size={14} />
						<p>{calculeAge(patient.nasc)} anos</p>
						<span>-</span>
						<p>{new Date(patient.nasc).toISOString().split('T')[0].split('-').reverse().join('/')}</p>
					</div>
					{patient.phone.length === 11 && (
						<Link
							href={`https://wa.me/55${patient.phone}`}
							target='_blank'
							title='WhatsApp'
							className='flex items-center gap-2  duration-300  hover:opacity-70'>
							<Phone size={12} />
							{`(${patient.phone.slice(0, 2)}) ${patient.phone.slice(2, 3)} ${patient.phone.slice(3, 7)}-${patient.phone.slice(7)}`}
						</Link>
					)}
					{patient.phone.length === 10 && (
						<Link title='Fixo' href={`#`} className='flex items-center gap-2 duration-300'>
							<Phone size={12} />
							{`(${patient.phone.slice(0, 2)}) ${patient.phone.slice(2, 6)}-${patient.phone.slice(6)}`}
						</Link>
					)}
					<p className='flex items-center gap-2 capitalize'>
						<LucideBookHeart size={12} />
						{plans && plans.find((plan) => plan._id === patient.plan)?.name}
					</p>
				</div>
				<div className='ml-auto flex flex-col items-center gap-0 md:flex-row'>
					<Link href={`/register?id=${patient._id}`}>
						<Button variant='link' title='Cadastro'>
							<UserCircle2 size={20} />
						</Button>
					</Link>
					<Button variant='link' title='Receituário' onClick={() => setshowFormReceit(true)}>
						<FileBadgeIcon size={20} />
					</Button>
					<Button variant='link' title='Gerar Guia' onClick={() => setShowFormGuia(true)}>
						<FilePlus2 size={20} />
					</Button>
				</div>
			</div>
			{showFormGuia && <FormGuia setShowFormGuia={setShowFormGuia} patient={patient} />}

			{showFormReceit && <FormReceit setshowFormReceit={setshowFormReceit} patient={patient} />}
		</>
	);
};

export default PatientDetails;
