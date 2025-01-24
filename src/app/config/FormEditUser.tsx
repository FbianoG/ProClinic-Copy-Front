'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClinicContext } from '@/context/ClinicContext';
import { useDoctorContext } from '@/context/DoctorContext';
import { useUserContext } from '@/context/UserContext';
import useClinic from '@/hooks/useClinic';
import useUser from '@/hooks/useUser';
import { EditIcon, Loader2, Plus, Save, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const FormEditUser = () => {
	const { register, handleSubmit, setValue, reset } = useForm<any>();

	const { user } = useUserContext();
	const { doctors } = useDoctorContext();

	const { clinic } = useClinicContext();

	const { getClinic } = useClinic();
	const { createUser, getUsers } = useUser();

	const { updateUser, updateClinic, loading } = useUser();

	const [editUser, setEditUser] = useState<boolean>(false);
	const [editClinic, setEditClinic] = useState<boolean>(false);
	const [creatUser, setCreatUser] = useState<boolean>(false);
	const [createIsDoctor, setCreateIsDoctor] = useState<boolean>(false);

	useEffect(() => {
		getClinic();
		getUsers();
	}, []);
	return (
		<div className='mx-auto max-w-[900px] space-y-4'>
			{user && doctors && clinic && (
				<>
					<div className='rounded bg-card p-4 shadow md:p-6'>
						<div className='flex items-center gap-2'>
							<div className='grid h-14 w-14 place-items-center rounded-full bg-secondary shadow'>
								<User2 />
							</div>
							<div className='flex flex-col capitalize'>
								<h4 className='text-lg font-semibold leading-5 text-primary'>{user?.name}</h4>
								<p className='text-sm opacity-70'>{user?.role === 'recep' ? 'Recepcionista' : user?.role === 'doctor' ? 'Médico' : 'Administrador'}</p>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit(updateUser)} className='rounded bg-card p-4 shadow md:p-6'>
						<h4 className='border-b text-lg font-semibold text-primary'>Informações Pessoais</h4>
						<div className='mt-4 flex flex-col gap-4 md:flex-row'>
							<div className='grid flex-1 gap-1'>
								<Label>Nome Completo:</Label>
								{!editUser && <Input className='capitalize' value={user?.name} disabled={true} />}
								{editUser && <Input className='capitalize' defaultValue={user?.name} {...register('name')} />}
							</div>
							<div className='grid flex-1 gap-1'>
								<Label>Login:</Label>
								{!editUser && <Input value={user?.login} disabled={true} />}
								{editUser && <Input autoComplete='off' defaultValue={user?.login} {...register('login')} />}
							</div>
						</div>
						{user?.role === 'doctor' && (
							<div className='mt-4 flex flex-col gap-4 md:flex-row'>
								<div className='grid flex-1 gap-1'>
									<Label>CRM:</Label>
									{!editUser && <Input className='capitalize' value={user?.crm} disabled={true} />}
									{editUser && <Input maxLength={8} className='capitalize' defaultValue={user?.crm} {...register('crm')} />}
								</div>
								<div className='grid flex-1 gap-1'>
									<Label>CBO:</Label>
									{!editUser && <Input value={user?.cbo} disabled={true} />}
									{editUser && <Input maxLength={6} defaultValue={user?.cbo} {...register('cbo')} />}
								</div>
							</div>
						)}
						<div className='mt-4 flex flex-col gap-4 md:flex-row'>
							<div className='grid flex-1 gap-1'>
								<Label>Senha Atual:</Label>
								{!editUser && <Input value='*********' disabled={true} />}
								{editUser && <Input autoComplete='off' type='password' {...register('oldPassword')} />}
							</div>
							<div className='grid flex-1 gap-1'>
								<Label>Nova Senha:</Label>
								{!editUser && <Input value='*********' disabled={true} />}
								{editUser && <Input autoComplete='off' type='password' {...register('newPassword')} />}
							</div>
						</div>
						<div className='mt-4 flex justify-end gap-4'>
							{!editUser && (
								<Button type='button' onClick={() => setEditUser(true)} className='flex items-center gap-2'>
									Editar <EditIcon size={12} />
								</Button>
							)}
							{editUser && (
								<>
									<Button
										type='button'
										variant='secondary'
										onClick={() => {
											setEditUser(false);
											reset();
										}}
										className='flex items-center gap-2'>
										Cancelar
									</Button>
									{loading && (
										<Button type='button' className='flex items-center gap-2' disabled>
											<Loader2 className='animate-spin' size={12} /> Salvando...
										</Button>
									)}
									{!loading && (
										<Button type='submit' className='flex items-center gap-2'>
											Salvar Aterações <Save size={12} />
										</Button>
									)}
								</>
							)}
						</div>
					</form>

					<form onSubmit={handleSubmit(updateClinic)} className='rounded bg-card p-4 shadow md:p-6'>
						<h4 className='border-b text-lg font-semibold text-primary'>Informações Clínica</h4>
						<div className='mt-4 flex flex-col gap-4 md:flex-row'>
							<div className='grid flex-1 gap-1'>
								<Label>Nome da Clínica:</Label>
								{!editClinic && <Input className='capitalize' value={clinic?.name} disabled={true} />}
								{editClinic && <Input className='capitalize' defaultValue={clinic?.name} {...register('nameClinic')} />}
							</div>
							<div className='grid flex-1 gap-1'>
								<Label>CNPJ:</Label>
								{!editClinic && <Input value={clinic?.cnpj} disabled={true} />}
								{editClinic && <Input maxLength={14} defaultValue={clinic?.cnpj} {...register('cnpj')} />}
							</div>
						</div>
						<div className='mt-4 flex flex-col gap-4 md:flex-row'>
							<div className='grid flex-1 gap-1'>
								<Label>Telefone:</Label>
								{!editClinic && <Input value={clinic?.phone} disabled={true} />}
								{editClinic && <Input maxLength={11} minLength={10} defaultValue={clinic?.phone} {...register('phone')} />}
							</div>
							<div className='grid flex-1 gap-1'>
								<Label>Endereço:</Label>
								{!editClinic && <Input value={clinic?.address} disabled={true} />}
								{editClinic && <Input defaultValue={clinic?.address} {...register('address')} />}
							</div>
						</div>
						<div className='mt-4 flex justify-end gap-4'>
							{user?.role === 'admin' && !editClinic && (
								<Button type='button' onClick={() => setEditClinic(true)} className='flex items-center gap-2'>
									Editar <EditIcon size={12} />
								</Button>
							)}
							{user?.role === 'admin' && editClinic && (
								<>
									<Button
										type='button'
										variant='secondary'
										onClick={() => {
											setEditClinic(false);
											reset();
										}}
										className='flex items-center gap-2'>
										Cancelar
									</Button>
									{loading && (
										<Button type='button' className='flex items-center gap-2' disabled>
											<Loader2 className='animate-spin' size={12} /> Salvando...
										</Button>
									)}
									{!loading && (
										<Button type='submit' className='flex items-center gap-2'>
											Salvar Aterações <Save size={12} />
										</Button>
									)}
								</>
							)}
						</div>
					</form>

					<form onSubmit={handleSubmit(createUser)} className='rounded bg-card p-4 shadow md:p-6'>
						<h4 className='border-b text-lg font-semibold text-primary'>Usuários</h4>
						<div className='mt-4 flex flex-col gap-2'>
							{doctors &&
								doctors.map((e, index) => (
									<div key={index} className='flex items-center gap-2 rounded p-2 duration-300 hover:bg-muted'>
										<div className='grid h-10 w-10 place-items-center rounded-full bg-secondary shadow'>
											<User2 size={15} />
										</div>
										<div className='flex flex-col capitalize'>
											<h4 className='font-semibold leading-5'>{e.name}</h4>

											<p className='text-sm opacity-70'>{e.role === 'recep' ? 'Recepcionista' : e.role === 'doctor' ? 'Médico' : 'Administrador'}</p>
										</div>
									</div>
								))}
						</div>
						{creatUser && (
							<div className='mt-4'>
								<h5 className='text-center font-semibold text-primary'>Criar Usuário</h5>
								<div className='mt-4 flex flex-col gap-4 md:flex-row'>
									<div className='grid flex-1 gap-1'>
										<Label>Nome Completo:</Label>

										<Input autoComplete='off' className='capitalize' {...register('nameUser')} />
									</div>
									<div className='grid flex-1 gap-1'>
										<Label>Login:</Label>

										<Input autoComplete='off' {...register('loginUser')} />
									</div>
								</div>
								<div className='mt-4 flex flex-col gap-4 md:flex-row'>
									<div className='grid flex-1 gap-1'>
										<Label>Senha:</Label>

										<Input autoComplete='off' type='password' {...register('passwordUser')} />
									</div>
									<div className='grid flex-1 gap-1'>
										<Label>Repita a Senha:</Label>

										<Input autoComplete='off' type='password' {...register('passwordConfirmUser')} />
									</div>
								</div>
								{createIsDoctor && (
									<div className='mt-4 flex flex-col gap-4 md:flex-row'>
										<div className='grid flex-1 gap-1'>
											<Label>CRM:</Label>

											<Input autoComplete='off' maxLength={8} {...register('crmUser')} />
										</div>
										<div className='grid flex-1 gap-1'>
											<Label>CBO:</Label>

											<Input autoComplete='off' maxLength={6} {...register('cboUser')} />
										</div>
									</div>
								)}
								<div className='mt-4 grid flex-1 gap-1 md:w-52'>
									<Label>Tipo de Usuário:</Label>

									<Select
										onValueChange={(value) => {
											setValue('roleUser', value);
											setCreateIsDoctor(value === 'doctor' ? true : false);
										}}
										{...register('roleUser')}>
										<SelectTrigger>
											<SelectValue placeholder='Selecione o tipo' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value='recep'>Recepcionista</SelectItem>
												<SelectItem value='doctor'>Médico</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
						)}
						<div className='mt-4 flex items-center justify-end gap-4'>
							{user?.role === 'admin' && !creatUser && (
								<Button type='button' onClick={() => setCreatUser(true)} className='flex items-center gap-2'>
									Adicionar Usuário <Plus size={15} />
								</Button>
							)}
							{user?.role === 'admin' && creatUser && (
								<>
									<Button
										type='button'
										variant='secondary'
										onClick={() => {
											setCreatUser(false);
											reset();
										}}
										className='flex items-center gap-2'>
										Cancelar
									</Button>
									{loading && (
										<Button type='button' className='flex items-center gap-2' disabled>
											<Loader2 className='animate-spin' size={12} /> Salvando...
										</Button>
									)}
									{!loading && (
										<Button type='submit' className='flex items-center gap-2'>
											Criar Usuário <Save size={12} />
										</Button>
									)}
								</>
							)}
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default FormEditUser;
