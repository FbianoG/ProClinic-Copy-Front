import axios from 'axios';
import urlBack from './urlBack';
import { IPlan } from '@/interfaces/iplan';
import { IUser } from '@/interfaces/user';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getPlansApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getPlans`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const createPlanApi = async (data: IPlan, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createPlan`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const editPlanApi = async (data: IPlan, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/editPlan`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const editTussPlanApi = async (data: { planId: string; codigo: string; procedimento: string; price: number }, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/editTussPlan`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
