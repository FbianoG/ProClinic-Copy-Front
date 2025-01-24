import axios from 'axios';
import urlBack from './urlBack';
import { IUser } from '@/interfaces/user';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getDashboardApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getDashboard`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getAgendaApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getAgenda`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updateEditEventApi = async (data: any, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updateEditEvent`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getAtendApi = async (patientId: any, user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getAtend?patientId=${patientId}`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};


export const getReportsApi = async (data: { type: string; doctor: string; start: Date; end: Date }, user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getReports?type=${data.type}&doctor=${data.doctor}&start=${data.start}&end=${data.end}`, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
