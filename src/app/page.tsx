'use client';
import { login } from '@/api/userApi';
import { Toast } from '@/utils/Toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClinicContext } from '@/context/ClinicContext';
import { useUserContext } from '@/context/UserContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
	login: string;
	password: string;
}

const Home = () => {
	const router = useRouter();

	const { register, handleSubmit } = useForm<Props>();

	const { setUser } = useUserContext();

	const { setClinic } = useClinicContext();

	const [alert, setAlert] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = async (data: Props) => {
		try {
			setAlert('');
			setLoading(true);
			const res = await login(data);
			localStorage.setItem('user', JSON.stringify({ ...res.user, token: res.token }));
			setUser({ ...res.user, token: res.token });
			setClinic(res.clinic);
			if (res.user.role === 'recep') {
				if (router) router.push('/agenda');
			} else {
				if (router) router.push('/dashboard');
			}
		} catch (error: any) {
			setAlert(error.message);
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='flex h-screen flex-col items-center justify-center gap-8 bg-background '>
			<div className='mx-auto mb-2 -mt-12 flex scale-150 items-start gap-1 text-lg font-semibold md:text-base'>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g clipPath='url(#clip0_1607_9770)'>
						<path
							d='M7.6 2.5V7.5C7.6 7.55523 7.55523 7.6 7.5 7.6H2.5C1.67157 7.6 0.999998 8.27157 1 9.1L1.00001 14.9C1.00001 15.7284 1.67158 16.4 2.50001 16.4H7.50001C7.55524 16.4 7.60001 16.4448 7.60001 16.5L7.6 21.5C7.6 22.3284 8.27157 23 9.1 23H14.9054C15.7338 23 16.4054 22.3284 16.4054 21.5L16.4054 16.4994C16.4054 16.4444 16.4498 16.3997 16.5048 16.3994L21.5092 16.3686C22.334 16.3636 23 15.6935 23 14.8687L23 9.06873C23 8.2367 22.3228 7.56364 21.4908 7.56876L16.506 7.59938C16.4505 7.59972 16.4054 7.55485 16.4054 7.49938V2.5C16.4054 1.67157 15.7338 1 14.9054 1H9.1C8.27157 1 7.6 1.67157 7.6 2.5Z'
							stroke='#3498db'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</g>
					<defs>
						<clipPath id='clip0_1607_9770'>
							<rect width='24' height='24' fill='white' />
						</clipPath>
					</defs>
				</svg>

				<div className='flex flex-col gap-0 leading-4'>
					<span className='text-[#555] dark:text-[#aaa]'>PROCLINIC</span>
					<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa] dark:text-[#555]'>
						<span>Medical Record</span>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-4 rounded bg-card p-8 px-12 shadow-xl'>
				<h3 className='mb-4 text-center text-3xl font-semibold text-primary'>Login</h3>
				<div className=''>
					<label htmlFor='login' className='text-muted-foreground'>
						Login
					</label>
					<Input className='w-60' type='text' id='login' defaultValue='admin' {...register('login')} />
				</div>
				<div className=''>
					<label htmlFor='password' className='text-muted-foreground'>
						Senha
					</label>
					<Input type='password' id='password' defaultValue='123' {...register('password')} />
				</div>
				<p className='text-center text-destructive'>{alert}</p>
				{!loading && <Button type='submit'>Entrar</Button>}
				{loading && (
					<Button disabled className='flex gap-2'>
						Entrando <Loader2 size={14} className='animate-spin' />
					</Button>
				)}
			</form>
		</main>
	);
};

export default Home;
