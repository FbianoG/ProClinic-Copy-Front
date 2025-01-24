'use client';
import Loader from '@/components/shared/Loader';
import usePatients from '@/hooks/usePatients';
import ItemListPatient from './ListPatientItem';
import SearchPatient from './SearchPatient';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	rest?: React.HTMLAttributes<HTMLDivElement>;
}

const ListPatient = ({ ...rest }: Props) => {
	const { searchPatients, loading, patients } = usePatients();

	return (
		<section {...rest}>
			<SearchPatient searchPatients={searchPatients} />

			<h4 className='mb-4 mt-8 text-lg font-medium text-primary'>Pacientes Encontrados</h4>

			<div className='waitList w-full overflow-auto rounded bg-card p-4 shadow'>
				<div className='flex w-full items-center border-b p-4 pt-0 font-bold md:min-w-max'>
					<span className='hidden w-[400px] min-w-[400px] md:block'>Nome</span>
					<span className='block w-full md:hidden'>Pacientes</span>
					<span className='hidden w-[120px] min-w-[120px] md:block'>Nascimento</span>
					<span className='hidden w-[150px] min-w-[170px] md:block'>CPF</span>
				</div>

				<ul >
					{loading && (
						<div className='grid w-full py-20'>
							<Loader text='Procurando pacientes' />
						</div>
					)}
					{!loading && patients && patients.length === 0 && <p className='w-full py-20 text-center'>Nenhum paciente encontrado</p>}

					{!loading && patients && patients.length > 0 && patients.map((patient) => <ItemListPatient key={patient._id} patient={patient} />)}
				</ul>
			</div>
		</section>
	);
};

export default ListPatient;
