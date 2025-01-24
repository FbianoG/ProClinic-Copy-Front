import Header from '@/components/shared/Header';
import Title from '@/components/shared/Title';
import Content from './Content';

const Reports = () => {
	return (
		<>
			<Header />
			<main className='px-4 py-4 md:px-8 lg:px-16'>
				<Title text='Relatorios' />
				<Content />
			</main>
		</>
	);
};

export default Reports;
