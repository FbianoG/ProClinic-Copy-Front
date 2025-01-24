import { IMedicalRecord } from '@/interfaces/medicalRecord';
import axios from 'axios';
import urlBack from './urlBack';
import { IUser } from '@/interfaces/user';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const createMedicalRecordApi = async (data: IMedicalRecord & { eventId: string }, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createMedicalRecord`, data, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getMedicalRecordApi = async (patientId: string, user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getMedicalRecord?id=${patientId}`, {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
