import Header from '@/components/shared/Header';
import Content from './Content';
import Title from '@/components/shared/Title';

const Atend = () => {
	return (
		<>
			<Header />
			<main className='px-4 pt-4 md:px-8 lg:px-16'>
				<Title text='Dashboard' />
				<section>
					<Content />
				</section>
			</main>
		</>
	);
};

export default Atend;
