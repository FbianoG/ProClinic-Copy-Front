'use client';

import { IEvent } from '@/interfaces/event';
import { IMedicalRecord } from '@/interfaces/medicalRecord';
import { Toast } from '@/utils/Toast';
import { createMedicalRecordApi, getMedicalRecordApi } from '@/api/medicalRecordApi';
import { useState } from 'react';
import useUser from './useUser';

const useMedicalRecord = () => {
	const { verifyUser } = useUser();

	// const { eventEnd } = useEvents();

	const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>(); // histórico deprontuários

	const createMedicalRecord = async (data: IMedicalRecord & {eventId: string}, event: IEvent) => {
		try {
			const currentUser = verifyUser();
			const urlQuery = new URLSearchParams(window.location.search).get('id');
			if (!urlQuery) throw new Error('ID do paciente não encontrado');
			data.patientId = urlQuery;
			data.date = new Date(event.start) as Date;
			data.dateEnd = new Date();
			data.dateStart = event.atendStart as Date;
			data.dateConfirm = event.confirm as Date;
			data.eventId = event._id as string;
			console.log( event )
			const res = await createMedicalRecordApi(data, currentUser);
			// await eventEnd(event);
			Toast('Sucesso', 'Atendimento finalizado com sucesso!', '✅');
			return res;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const getMedicalRecord = async () => {
		try {
			const currentUser = verifyUser();
			const urlQuery = new URLSearchParams(window.location.search).get('id');
			if (!urlQuery) throw new Error('ID do paciente não encontrado');
			const patientId = urlQuery;
			const res = await getMedicalRecordApi(patientId, currentUser);
			setMedicalRecords(res);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	return { createMedicalRecord, getMedicalRecord, medicalRecords, setMedicalRecords };
};

export default useMedicalRecord;
