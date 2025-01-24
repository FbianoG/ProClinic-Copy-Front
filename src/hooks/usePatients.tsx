'use client';

import { createPatientApi, getPatientApi, searchPatientsApi, updatePatientApi } from '@/api/patientApi';
import { IPatient } from '@/interfaces/patients';
import { Toast } from '@/utils/Toast';
import { useState } from 'react';
import useUser from './useUser';

/* eslint-disable @typescript-eslint/no-explicit-any */

const usePatients = () => {
	const { verifyUser } = useUser();

	const [patients, setPatients] = useState<IPatient[]>([]);

	const [patient, setPatient] = useState<IPatient>();

	const [loading, setLoading] = useState<boolean>(false);

	const loadPatients = async (value: string) => {
		try {
			const currentUser = verifyUser();
			if (value.trim() === '') throw new Error('Valor não pode ser vazio');
			const res = await searchPatientsApi(value.toLocaleLowerCase(), currentUser);
			setPatients(res);
		} catch (error) {
			console.log(error);
		}
	};

	const createPatient = async (data: IPatient, setOpen: (value: boolean) => void) => {
		try {
			setLoading(true);
			if (isNaN(Number(data.phone))) throw new Error('Telefone inválido. Utilize apenas números e sem espaços.');
			if (data.phone.length !== 11 && data.phone.length !== 10) throw new Error('Telefone inválido. É necessário ter 11 ou 10 dígitos.');
			const currentUser = verifyUser();
			await createPatientApi(data, currentUser);
			Toast('Sucesso', 'Paciente criado com sucesso.', '✅');
			setOpen(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getPatient = async (patientId: string) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getPatientApi(patientId, currentUser);
			setPatient(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const updatePatient = async (data: IPatient, setState: (value: boolean) => void) => {
		try {
			setState(true);
			if (isNaN(Number(data.phone))) throw new Error('Telefone inválido. Utilize apenas números e sem espaços.');
			if (data.phone.length !== 11 && data.phone.length !== 10) throw new Error('Telefone inválido. É necessário ter 11 ou 10 dígitos.');
			const currentUser = verifyUser();
			const res = await updatePatientApi(data, currentUser);
			setPatient(res);
			Toast('Sucesso', 'Paciente atualizado com sucesso.', '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setState(false);
		}
	};

	const searchPatients = async (data: any) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await searchPatientsApi(data, currentUser);
			setPatients(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return { loadPatients, createPatient, getPatient, searchPatients, updatePatient, loading, patient, patients };
};

export default usePatients;
