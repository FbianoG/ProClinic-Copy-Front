import axios from 'axios';
import urlBack from './urlBack';
import { IPatient } from '@/interfaces/patients';
import { IUser } from '@/interfaces/user';
import { IEvent } from '@/interfaces/event';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const searchPatientsNameApi = async (value: string, token: string) => {
	try {
		const res = await axios.get(`${urlBack}/searchPatients?value=${value}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

// encontrar pacientes lista
export const searchPatientsApi = async (data: string, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/searchPatientsList`, data, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const createPatientApi = async (data: IPatient, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createPatient`, data, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getPatientApi = async (patientId: string, user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getPatient?patientId=${patientId}`, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updatePatientApi = async (data: IPatient | IEvent, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updatePatient`, data, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
