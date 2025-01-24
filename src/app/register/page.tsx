import Header from '@/components/shared/Header';
import FormRegister from './FormRegister';

const Register = () => {
	return (
		<>
			<Header />
			<div className='mt-4 px-[5%]'>
				<FormRegister />
			</div>
		</>
	);
};

export default Register;
