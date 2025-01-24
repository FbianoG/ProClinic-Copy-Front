'use client';

import { updateClinicApi } from '@/api/clinicApi';
import { createUserApi, getUsersApi, updateUserApi } from '@/api/userApi';
import { useClinicContext } from '@/context/ClinicContext';
import { useDoctorContext } from '@/context/DoctorContext';
import { useUserContext } from '@/context/UserContext';
import { IClinic } from '@/interfaces/clinic';
import { IUser } from '@/interfaces/user';
import { Toast } from '@/utils/Toast';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PropsCreateUser {
	nameUser: string;
	loginUser: string;
	passwordUser: string;
	passwordConfirmUser: string;
	crmUser: string;
	cboUser: string;
	roleUser: string;
}

const useUser = () => {
	const { user, setUser } = useUserContext();
	const { doctors, setDoctors } = useDoctorContext();
	const { setClinic } = useClinicContext();

	const [loading, setLoading] = useState<boolean>(false);

	const verifyUser = () => {
		const currentUser = user || JSON.parse(localStorage.getItem('user') as string);
		if (!currentUser) {
			console.log('Usuário nao conectado.');
			throw new Error('Usuário não conectado.');
		}
		if (!user) setUser(currentUser);
		return currentUser;
	};

	const getUsers = async () => {
		try {
			const currentUser = verifyUser();
			const res = await getUsersApi(currentUser);
			setDoctors(res.users);
		} catch (error: any) {
			console.log(error);
			Toast('Erro', error.message, '⛔');
		}
	};

	const createUser = async (data: PropsCreateUser) => {
		try {
			setLoading(true);
			if (!window.confirm('Tem certeza que deseja criar um novo usuário?')) return;
			const currentUser = verifyUser();
			if (!data.nameUser || !data.loginUser || !data.passwordUser || !data.passwordConfirmUser || !data.roleUser) throw new Error('Preencha todos os campos.');

			if (data.roleUser === 'doctor' && (!data.crmUser || !data.cboUser)) throw new Error('Preencha os campos CRM e CBO.');

			const dataUser = {
				name: data.nameUser.toLocaleLowerCase().trim(),
				login: data.loginUser.toLocaleLowerCase().trim(),
				password: data.passwordUser.trim(),
				passwordConfirm: data.passwordConfirmUser.trim(),
				crm: data.crmUser?.trim(),
				cbo: data.cboUser?.trim(),
				role: data.roleUser,
			};

			const res = await createUserApi(dataUser, currentUser);
			setDoctors([...(doctors as IUser[]), res.userCreate]);
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async (data: IUser) => {
		try {
			setLoading(true);
			if (!window.confirm('Tem certeza que deseja alterar seus dados?')) return;
			const currentUser = verifyUser();
			if (currentUser.role === 'doctor' && (!data.crm || !data.cbo)) throw new Error('Preencha os campos CRM e CBO.');
			if (!data.name || !data.login) throw new Error('Preencha todos os campos.');
			const res = await updateUserApi(data, currentUser);
			localStorage.setItem('user', JSON.stringify({ ...res.user, token: res.token }));
			setUser({ ...res.user, token: res.token });
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	// function era para estar no hook useClinic decidi deixar aqui para aproveitar o 'loading' na page 'Config'
	const updateClinic = async (data: IClinic & { nameClinic: string }) => {
		try {
			setLoading(true);
			if (!window.confirm('Tem certeza que deseja alterar os dados da clínica?')) return;
			const currentUser = verifyUser();
			if (currentUser.role !== 'admin') throw new Error('Usuário não tem permissão para alterar dados da clinica.');
			if (!data.nameClinic || !data.cnpj || !data.address || !data.phone) throw new Error('Preencha todos os campos.');
			data.name = data.nameClinic;
			const res = await updateClinicApi(data, currentUser);
			setClinic(res.clinic);
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return { verifyUser, getUsers, createUser, updateUser, updateClinic, loading };
};

export default useUser;
