'use client';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlansContext } from '@/context/PlansContext';
import usePatients from '@/hooks/usePatients';
import usePlans from '@/hooks/usePlans';
import { IPatient } from '@/interfaces/patients';
import { IdCard, Loader2, LucideBookHeart, Mail, Map, Phone, Save, User2Icon, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable react-hooks/exhaustive-deps */

const FormRegister = () => {
	const { register, handleSubmit, setValue, watch } = useForm<IPatient>();

	const { getPlans } = usePlans();

	const { updatePatient } = usePatients();

	const { getPatient, patient, loading } = usePatients();

	const { plans } = usePlansContext(); // Planos

	const [loadingCreate, setloadingCreate] = useState<boolean>(false);

	useEffect(() => {
		if (!plans) getPlans();
		const urlQuery = new URLSearchParams(window.location.search).get('id'); // www.teste.com.br/user?id=123456
		if (!urlQuery) return;
		getPatient(urlQuery);
	}, []);

	useEffect(() => {
		if (!patient || !plans) return;
		setValue('patientId', patient._id);
		setValue('name', patient.name);
		setValue('phone', patient.phone);
		setValue('nasc', new Date(patient.nasc).toISOString().split('T')[0]);
		setValue('plan', patient.plan);
		setValue('planNumber', patient.planNumber);
		setValue('cpf', patient.cpf);
		setValue('mother', patient.mother);
		setValue('email', patient.email);
		setValue('cep', patient.cep);
		setValue('address', patient.address);
		setValue('addressNumber', patient.addressNumber);
		setValue('neighborhood', patient.neighborhood);
		setValue('city', patient.city);
		setValue('state', patient.state);
		setValue('gender', patient.gender);
	}, [patient, plans]);

	// Buscar dados do CEP
	const getCep = async (value: string) => {
		try {
			if (value.trim().length !== 8) return;
			const cep = await fetch(`https://viacep.com.br/ws/${watch('cep').trim()}/json/`);
			const data = await cep.json();
			setValue('address', data.logradouro);
			setValue('neighborhood', data.bairro);
			setValue('city', data.localidade);
			setValue('state', data.estado);
		} catch (error) {
			console.log(error);
		}
	};

	// Evento Editar Paciente
	const handleEditPatient = async (data: IPatient) => {
		await updatePatient(data, setloadingCreate);
	};

	return (
		<>
			<h2 className='mx-auto mt-6 w-max text-2xl font-medium text-primary'>Cadastro Paciente</h2>

			{loading && <Loader text='Carregando Paciente...' />}

			{!loading && patient && plans && (
				<form onSubmit={handleSubmit(handleEditPatient)} className='mx-auto my-5 flex max-w-[600px] flex-col gap-4 rounded bg-card p-4 shadow md:p-10'>
					{/* Nome */}
					<div className='flex flex-col gap-1'>
						<Label></Label>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='name'>
							Nome Completo:
							<span className='font-bold text-red-500'>*</span>
						</Label>
						<Input id='name' {...register('name')} className='capitalize' required />
					</div>

					{/* Nascimento - CPF */}
					<div className='flex justify-between gap-1'>
						<div className='flex flex-col gap-1'>
							<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='nasc'>
								Nascimento:<span className='font-bold text-red-500'>*</span>
							</Label>
							<Input id='nasc' type='date' {...register('nasc')} required />
						</div>
						<div className='flex flex-col gap-1'>
							<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='cpf'>
								CPF:
								<span className='font-bold text-red-500'>*</span>
							</Label>
							<Input id='cpf' {...register('cpf')} maxLength={11} disabled={patient.cpf ? true : false} />
						</div>
					</div>

					{/* Gênero */}
					<div className='flex flex-col gap-1'>
						<label className='flex items-center gap-1 text-sm text-primary' htmlFor='gender'>
							<User2Icon size={12} />
							Gênero:
							<span className='font-bold text-red-500'>*</span>
						</label>

						<Select defaultValue={patient.gender} onValueChange={(value: 'mas' | 'fem') => setValue('gender', value)} {...register('gender', { required: true })}>
							<SelectTrigger id='gender'>
								<SelectValue placeholder='Selecione o sexo' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='mas' className='capitalize'>
										<div className='flex items-center gap-2'>
											<User2Icon size={12} color='#0973dc' />
											Masculino
										</div>
									</SelectItem>
									<SelectItem value='fem' className='capitalize'>
										<div className='flex items-center gap-2'>
											<User2Icon size={12} color='#dd61a6' />
											Feminino
										</div>
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* Nome Mãe */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='mother'>
							<UserRound size={12} />
							Nome da Mãe:
							<span className='font-bold text-red-500'>*</span>
						</Label>
						<Input id='mother' {...register('mother')} className='capitalize' required />
					</div>

					{/* Telefone */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-2 text-sm text-primary' htmlFor='phone'>
							<Phone size={12} />
							Telefone:
							<span className='font-bold text-red-500'>*</span>
						</Label>
						<Input id='phone' maxLength={11} minLength={10} {...register('phone')} required />
					</div>

					{/* Email */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-2 text-sm text-primary' htmlFor='email'>
							<Mail size={12} />
							E-mail:
						</Label>
						<Input id='email' {...register('email')} />
					</div>

					{/* Plano */}
					<div className='flex flex-col gap-1 '>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='plan'>
							<LucideBookHeart size={12} />
							Plano:
							<span className='font-bold text-red-500'>*</span>
						</Label>
						{plans && (
							<Select defaultValue={patient.plan} onValueChange={(value) => setValue('plan', value)} {...register('plan', { required: true })} >
								<SelectTrigger id='plan' className='capitalize'>
									<SelectValue placeholder='Selecione o plano' />
								</SelectTrigger>
								<SelectContent className='capitalize'>
									<SelectGroup>
										{plans.map((plan) => (
											<SelectItem key={plan._id} value={plan._id} >
												{plan.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</div>

					{/* Carteirinha */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='planNumber'>
							<IdCard size={12} />
							Número da Carteirinha:
							<span className='font-bold text-red-500'>*</span>
						</Label>
						<Input id='planNumber' {...register('planNumber')} required />
					</div>

					{/* Cep */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='cep'>
							<Map size={12} />
							Cep:
						</Label>
						<Input id='cep' autoComplete='off' onKeyUp={(e) => getCep(e.currentTarget.value)} {...register('cep')} />
					</div>

					{/* Rua */}
					<div className='flex gap-1'>
						<div className='flex-1'>
							<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='address'>
								<Map size={12} />
								Rua:
							</Label>
							<Input id='address' {...register('address')} />
						</div>

						{/* Número */}
						<div className='max-w-24'>
							<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='addressNumber'>
								Número:
							</Label>
							<Input id='addressNumber' {...register('addressNumber')} />
						</div>
					</div>

					{/* Cidade */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='bairro'>
							<Map size={12} />
							Bairro:
						</Label>
						<Input id='bairro' {...register('neighborhood')} />
					</div>

					{/* Cidade */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='city'>
							<Map size={12} />
							Cidade:
						</Label>
						<Input id='city' {...register('city')} />
					</div>

					{/* Estado */}
					<div className='flex flex-col gap-1'>
						<Label className='flex items-center gap-1 text-sm text-primary' htmlFor='state'>
							<Map size={12} />
							UF:
						</Label>
						<Input id='state' {...register('state')} />
					</div>

					{/* Buttons */}
					<div className='flex justify-end'>
						{!loadingCreate && (
							<Button className='flex gap-2'>
								Editar Cadastro <Save size={14} />
							</Button>
						)}
						{loadingCreate && (
							<Button disabled className='flex gap-2'>
								Editando <Loader2 size={14} className='animate-spin' />
							</Button>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default FormRegister;
