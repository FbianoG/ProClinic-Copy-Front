'use client';

import { getAgendaApi, getAtendApi, getDashboardApi, getReportsApi, updateEditEventApi } from '@/api/comboApi';
import { useEventContext } from '@/context/EventContext';
import { Toast } from '@/utils/Toast';
import { useState } from 'react';
import useUser from './useUser';
import { usePlansContext } from '@/context/PlansContext';
import { useClinicContext } from '@/context/ClinicContext';
import { useDoctorContext } from '@/context/DoctorContext';
import { IEvent } from '@/interfaces/event';
import { getHistoryEventsApi, updateEventApi } from '@/api/eventApi';
import { IMedicalRecord } from '@/interfaces/medicalRecord';
import { IPatient } from '@/interfaces/patients';
import { useWaitEventContext } from '@/context/WaitEventContext';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useCombo = () => {
	const { clinic } = useClinicContext();

	const { events, setEvents } = useEventContext();

	const { setWaitEvents } = useWaitEventContext();

	const { setPlans } = usePlansContext();

	const { setClinic } = useClinicContext();

	const { setDoctors } = useDoctorContext();

	const { verifyUser } = useUser();

	const [patient, setPatient] = useState<IPatient>();

	const [loading, setLoading] = useState<boolean>(false);

	const getDashboard = async () => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getDashboardApi(currentUser);
			setEvents(res.doctorEvents);
			setPlans(res.plans);
			setDoctors(res.doctors);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getAgenda = async () => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getAgendaApi(currentUser);
			setEvents(res.events);
			setWaitEvents(res.waitEvents);
			setPlans(res.plans);
			setDoctors(res.doctors);
			setClinic(res.clinic);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const updateEditEvent = async (data: IEvent, setOpen: (value: boolean) => void) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();

			if (isNaN(Number(data.phone))) throw new Error('Telefone inválido. Utilize apenas números e sem espaços.');
			if (data.phone.length !== 11 && data.phone.length !== 10) throw new Error('Telefone inválido. É necessário ter 11 ou 10 dígitos.');
			if (!events) return;
			if (data.status === 'atendimento' || data.status === 'atendido')
				throw new Error('Não é possível alterar o status. O paciente já está em atendimento ou já foi atendido.');
			if (new Date(data.start).getDay() === 0) throw new Error('Não é possivel alterar o agendamento para Domingo.');
			if (new Date(data.start) < new Date(new Date(data.start).toISOString().slice(0, 10) + 'T' + clinic?.start))
				throw new Error('Horário está fora do horário de atendimento.');
			if (new Date(data.start) >= new Date(new Date(data.start).toISOString().slice(0, 10) + 'T' + clinic?.end))
				throw new Error('Horário está fora do horário de atendimento.');

			if (data.patientId) {
				const res = await updateEditEventApi(data, currentUser);
				const newUpdate = events.map((element) => {
					if (element._id === data._id)
						return res.event; ///
					else return element;
				});

				setEvents(newUpdate);
				Toast('Sucesso', res.message, '✅');
			} else {
				const res = await updateEventApi(data, currentUser);
				const newUpdate = events.map((element) => {
					if (element._id === data._id) return res.update;
					else return element;
				});
				setEvents(newUpdate);
				Toast('Sucesso', res.message, '✅');
			}

			if (setOpen) setOpen(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getAtend = async (setMedicalRecords: (value: IMedicalRecord[]) => void, setWEvents: (value: IEvent[]) => void) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const urlQuery = new URLSearchParams(window.location.search).get('id');
			if (!urlQuery) throw new Error('ID do paciente não encontrado');
			const res = await getAtendApi(urlQuery, currentUser);
			setDoctors(res.doctors);
			setPlans(res.plans);
			setMedicalRecords(res.medicalRecords.sort((a: IMedicalRecord, b: IMedicalRecord) => new Date(b.date).getTime() - new Date(a.date).getTime()));
			setPatient(res.patient);
			setWEvents(res.waitEvents);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getHistory = async (setHistoryEvents: (value: IEvent[]) => void) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getHistoryEventsApi(currentUser);
			setHistoryEvents(res.historyEvents);
			setPlans(res.plans);
			setDoctors(res.doctors);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const getReports = async (data: { type: string; doctor: string; start: Date; end: Date }) => {
		try {
			setLoading(true);
			console.log(data);
			if ( !data.doctor || !data.start || !data.end) throw new Error('Preencha todos os dados.');
			if (new Date(data.start.getTime() - data.end.getTime()).getTime() > 0) throw new Error('A data inicial deve ser menor que a data final.');
			if (new Date(data.end.getTime() - data.end.getTime()).getTime() > 365 * 24 * 60 * 60 * 1000) throw new Error('A diferença entre as datas deve ser menor que um ano.');
			const currentUser = verifyUser();
			const res = await getReportsApi(data, currentUser);
			setEvents(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return { getDashboard, getAgenda, updateEditEvent, getAtend, getHistory, getReports, loading, patient };
};

export default useCombo;
