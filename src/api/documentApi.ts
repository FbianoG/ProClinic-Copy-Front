import axios from 'axios';
import urlBack from './urlBack';
import { IUser } from '@/interfaces/user';
import { IDocument } from '@/interfaces/document';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getDocumentsApi = async (user: IUser) => {
	try {
		const res = await axios.get(`${urlBack}/getDocuments`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const createDocumentApi = async (data: any, user: IUser) => {
	try {
		const res = await axios.put(`${urlBack}/createDocument`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const updateDocumentApi = async (data: any, user: IUser) => {
	try {
		const res = await axios.post(`${urlBack}/updateDocument`, data, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};

export const deleteDocumentApi = async (document: IDocument, user: IUser) => {
	try {
		const res = await axios.delete(`${urlBack}/deleteDocument?docName=${document.docName}&id=${document._id}`, { headers: { Authorization: `Bearer ${user.token}` } });
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) throw new Error(error.response.data.message);
		else if (error.request) throw new Error('Error de rede. Tente novamente.');
		else throw new Error(error.message);
	}
};
