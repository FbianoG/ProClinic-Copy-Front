'use client';

import { createDocumentApi, deleteDocumentApi, getDocumentsApi, updateDocumentApi } from '@/api/documentApi';
import { Toast } from '@/utils/Toast';
import { IDocument } from '@/interfaces/document';
import useUser from './useUser';
import { useState } from 'react';
import { useDocumentsContext } from '@/context/DocumentContext';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useDocuments = () => {
	const { verifyUser } = useUser();

	const { documents, setDocuments } = useDocumentsContext();

	const [loading, setLoading] = useState<boolean>(false);

	const createDocument = async (data: any, setShowModal: (value: boolean) => void) => {
		try {
			setLoading(true);
			if (data.file[0].size > 4194304) throw new Error('Tamanho máximo permitido 4MB.');
			const currentUser = verifyUser();
			const formData = new FormData();
			formData.append('file', data.file[0]);
			formData.append('name', data.name);
			formData.append('category', data.category);
			const res = await createDocumentApi(formData, currentUser);
			Toast('Sucesso', 'Documento criado com sucesso!', '✅');
			setDocuments([...(documents as IDocument[]), res.create]);
			setShowModal(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const updateDocument = async (data: IDocument & { file: any }, setShowModal: (value: boolean) => void) => {
		try {
			if (!documents) return;
			setLoading(true);
			const currentUser = verifyUser();
			const formData = new FormData();
			formData.append('_id', data._id as string);
			formData.append('file', data.file[0]);
			formData.append('name', data.name);
			formData.append('category', data.category);
			const res = await updateDocumentApi(formData, currentUser);
			setDocuments(documents?.map((document: IDocument) => (document._id === res._id ? res : document)));
			Toast('Sucesso', 'Documento atualizado com sucesso!', '✅');
			setShowModal(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getDocuments = async () => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getDocumentsApi(currentUser);
			setDocuments(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const deleteDocument = async (document: IDocument, setShowModal: (value: boolean) => void) => {
		try {
			if (!documents) return;
			setLoading(true);
			const currentUser = verifyUser();
			await deleteDocumentApi(document as IDocument, currentUser);
			Toast('Sucesso', 'Documento excluido com sucesso!', '✅');
			setDocuments(documents?.filter((doc: IDocument) => doc._id !== document._id));
			setShowModal(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return { createDocument, updateDocument, getDocuments, deleteDocument, documents, loading };
};

export default useDocuments;
