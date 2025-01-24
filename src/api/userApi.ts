import axios from 'axios';
import urlBack from './urlBack';
import { IUser } from '@/interfaces/user';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const login = async (data: { login: string; password: string }) => {
	try {
		if ((data.login.trim() === '', data.password.trim() === '')) throw new Error('Preencha todos os campos.');

		const res = await axios.post(`${urlBack}/login`, data);
		return res.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getUsersApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getUsers`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const createUserApi = async (data: Partial<IUser> & { passwordConfirm: string }, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createUser`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getDoctorApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getDoctors`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updateUserApi = async (data: IUser, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updateUser`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
