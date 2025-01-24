import Header from '@/components/shared/Header';
import Title from '@/components/shared/Title';
import FormEditUser from './FormEditUser';

const Config = () => {
	return (
		<>
			<Header />
			<main className='px-4 py-4 md:px-8 lg:px-16'>
				<div className='w-max mx-auto'>
					<Title text='Configurações' />
				</div>
				<section>
					<FormEditUser />
				</section>
			</main>
		</>
	);
};

export default Config;
