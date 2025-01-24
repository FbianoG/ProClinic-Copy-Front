import Header from '@/components/shared/Header';
import ListPatient from './ListPatient';

const Patients = () => {
	return (
		<>
			<Header />
			<main className='w-vw overflow-hidden p-4 md:px-8 lg:px-16'>
				<h2 className='mb-4 text-2xl font-medium text-primary'>Pesquisar Paciente</h2>
				<section>
					<ListPatient className='w-full' />
				</section>
			</main>
		</>
	);
};

export default Patients;
