import { IEvent } from '@/interfaces/event';
import { IUser } from '@/interfaces/user';
import axios from 'axios';
import urlBack from './urlBack';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getEventsApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getEvents`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getDayEventsApi = async (day: string, user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getEvents?date=${day}`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getWaitEventsApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getWaitEvents`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getHistoryEventsApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getHistoryEvents`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const getDoctorEventsApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getDoctorEvents`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const createEventApi = async (data: IEvent, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createEvent`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const dropEventApi = async (data: { _id: string; start: Date; end: Date }, user: IUser) => {
	try {
		await axios.post(`${urlBack}/dropEvent`, data, { headers: { Authorization: `Bearer ${user.token}` } });
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updateEventApi = async (data: IEvent, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updateEvent`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const deleteEventApi = async (_id: string, user: IUser) => {
	try {
		const res = await axios.delete(`${urlBack}/deleteEvent?id=${_id}`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const changeEventStatus = async (data: IEvent, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/changeStatus`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const initEventStatus = async (data: { eventId: string; atendStart: Date }, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/initAtend`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const changeConfirmedApi = async (data: IEvent, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/changeConfirmed`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
