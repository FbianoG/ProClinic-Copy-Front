import { IPatient } from '@/interfaces/patients';
import Link from 'next/link';

interface Props {
	patient: IPatient;
}

const ListPatientItem = ({ patient }: Props) => {
	return (
		<li
			key={patient._id}
			className='w-full cursor-pointer border-b p-4 duration-300 first:border-t group first:border-t-transparent last:border-b-transparent even:bg-card hover:bg-background'>
			<Link href={`/atend?id=${patient._id}`} className='flex flex-wrap items-center '>
				<p className='w-full truncate font-semibold capitalize md:w-[400px] group-hover:text-primary duration-300 text-foreground'>{patient.name}</p>

				<p className='w-[120px] text-xs opacity-70 md:text-base'>{new Date(patient.nasc).toISOString().split('T')[0].split('-').reverse().join('/')}</p>

				<p className='w-[150px] text-xs opacity-70 md:text-base'>{patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') || '-'}</p>
			</Link>
		</li>
	);
};

export default ListPatientItem;
