'	use client';
import { IPatient } from '@/interfaces/patients';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
	patients: IPatient[];
	selectPatient: (value: IPatient) => void;
	setSearch: (value: boolean) => void;
}

const SearchPatient = ({ patients, selectPatient, setSearch, ...rest }: Props) => {
	

	return (
		<>
			<ul {...rest}>
				{patients.length > 0 && patients &&
					patients.map((patient) => (
						<li
							key={patient._id}
							title={`Mae: ${patient.mother}`}
							onClick={() => selectPatient(patient)}
							className='cursor-pointer rounded p-2 text-sm duration-300 hover:bg-accent'>
							<p className='capitalize'>{patient.name}</p>
							<div className='flex justify-between gap-4'>
								<span>{new Date(patient.nasc).toLocaleDateString()}</span>
								<span>{patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</span>
							</div>
						</li>
					))}
				{patients.length === 0 && <li className='cursor-pointer rounded p-2 text-sm'>Nenhum paciente encontrado.</li>}
			</ul>
			<div className='fixed left-0 top-0 h-full w-full' onClick={() => setSearch(false)}></div>
		</>
	);
};

export default SearchPatient;
