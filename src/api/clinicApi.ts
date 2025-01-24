import axios from 'axios';
import urlBack from './urlBack';
import { IUser } from '@/interfaces/user';
import { IClinic } from '@/interfaces/clinic';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getClinicApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getClinic`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updateClinicApi = async (data: IClinic, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updateClinic`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

