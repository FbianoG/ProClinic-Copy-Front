'use client';

import {
	changeConfirmedApi,
	changeEventStatus,
	createEventApi,
	deleteEventApi,
	dropEventApi,
	getDayEventsApi,
	getWaitEventsApi,
	initEventStatus,
	updateEventApi,
} from '@/api/eventApi';
import { updatePatientApi } from '@/api/patientApi';
import { useEventContext } from '@/context/EventContext';
import { IEvent } from '@/interfaces/event';
import { Toast } from '@/utils/Toast';
import { EventDropArg } from '@fullcalendar/core/index.js';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { useState } from 'react';
import useUser from './useUser';
import { useWaitEventContext } from '@/context/WaitEventContext';
import { useClinicContext } from '@/context/ClinicContext';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
	setOpen?: (value: boolean) => void;
}

const useEvents = ({ setOpen }: Props = {}) => {
	const { events, setEvents } = useEventContext();

	const { waitEvents, setWaitEvents } = useWaitEventContext();

	const { verifyUser } = useUser();

	const { clinic } = useClinicContext();

	const [loading, setLoading] = useState<boolean>(false);

	const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

	const getEvents = async (date: Date) => {
		try {
			setLoadingEvents(true);
			const currentUser = verifyUser();
			const day = date.toISOString().slice(0, 10);
			const res = await getDayEventsApi(day, currentUser);
			setEvents(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoadingEvents(false);
		}
	};

	const getWaitEvents = async () => {
		try {
			setLoadingEvents(true);
			const currentUser = verifyUser();
			const res = await getWaitEventsApi(currentUser);
			setWaitEvents(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const createEvent = async (data: IEvent) => {
		try {
			setLoading(true);
			if (data.status === 'bloqueado') {
				data.phone = '0000000000';
				data.plan = '0';
				data.planNumber = '0';
				data.type = 'bloqueado';
				data.patientNasc = '1900-01-01T00:00:00.000Z'
			}
			if (isNaN(Number(data.phone))) throw new Error('Telefone inválido. Utilize apenas números e sem espaços.');
			if (data.phone.length !== 11 && data.phone.length !== 10) throw new Error('Telefone inválido. É necessário ter 11 ou 10 dígitos.');
			const currentUser = verifyUser();
			// if (new Date(data.start) < new Date()) throw new Error('Data selecionada é inferior ao dia de hoje.');
			if (new Date(data.start) >= new Date(data.end)) throw new Error('Horário da consulta é inferior ao horário de encerramento.');
			if (data.patientId) {
				const [res] = await Promise.all([createEventApi(data, currentUser)]);
				setEvents([...(events as IEvent[]), res]);
			} else {
				const res = await createEventApi(data, currentUser);
				setEvents([...(events as IEvent[]), res]);
			}
			if (setOpen) setOpen(false);
			Toast('Sucesso', 'Evento criado com sucesso.', '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const updateEvent = async (data: IEvent) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			if (!events) return;
			if (data.status === 'atendimento' || data.status === 'atendido')
				throw new Error('Não é possível alterar o status. O paciente já está em atendimento ou já foi atendido.');
			if (new Date(data.start).getDate() === 0) throw new Error('Não é possivel alterar o agendamento para Domingo.');

			if (data.patientId) {
				const newDate = { ...data, name: data.title, nasc: data.patientNasc };
				const [res] = await Promise.all([updateEventApi(data, currentUser), updatePatientApi(newDate, currentUser)]);
				const newUpdate = events.map((element) => {
					if (element._id === data._id) return res.update;
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

	const eventDropUpdate = async (data: EventDropArg | EventResizeDoneArg) => {
		try {
			if (!events) return;
			const currentUser = verifyUser();
			if (data.event.extendedProps.status === 'atendimento' || data.event.extendedProps.status === 'atendido') {
				setEvents(events);
				throw new Error('Não é possível alterar o status. O paciente já está em atendimento ou já foi atendido.');
			}

			if (new Date(data.event.startStr) < new Date(data.event.startStr.slice(0, 10) + 'T' + clinic?.start)) throw new Error('Horário está fora do horário de atendimento.');
			if (new Date(data.event.startStr) >= new Date(data.event.startStr.slice(0, 10) + 'T' + clinic?.end)) throw new Error('Horário está fora do horário de atendimento.');

			const eventDrop = {
				_id: data.event.extendedProps._id,
				start: new Date(data.event.startStr),
				end: new Date(data.event.endStr),
			};

			await dropEventApi(eventDrop, currentUser);
			const newEvents = events.map((element) => {
				if (element._id == eventDrop._id) return { ...element, start: eventDrop.start, end: eventDrop.end };
				else return element;
			});
			setEvents(newEvents);
			Toast('Sucesso', 'Evento editado com sucesso.', '✅');
		} catch (error: any) {
			data.revert();
			Toast('Erro', error.message, '⛔');
		}
	};

	const eventDelete = async (id: string) => {
		if (!events) return;
		try {
			const currentUser = verifyUser();
			if (!confirm('Tem certeza que deseja excluir este evento?')) return;
			await deleteEventApi(id, currentUser);
			setEvents(events.filter((event) => event._id !== id));
			if (setOpen) setOpen(false);
			Toast('Sucesso', 'Evento excluído com sucesso.', '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const eventChangeStatus = async (data: IEvent, preEvent: IEvent) => {
		if (!events || !waitEvents) return;
		try {
			const currentUser = verifyUser();
			if (preEvent.status === 'atendimento' || preEvent.status === 'atendido')
				throw new Error('Não é possível alterar o status. O paciente já está em atendimento ou já foi atendido.');
			if (!data.patientId) throw new Error('O agendamento deve estar registrado a um paciente para realizar a alteração.');
			data.confirm = new Date();
			const res = await changeEventStatus(data, currentUser);
			const newUpdate = events.map((element) => {
				if (element._id === data._id) return res.event;
				else return element;
			});
			setEvents(newUpdate);
			console.log(res.event);
			if (res.event.status === 'atendimento') {
				const newWaitUpdate = waitEvents.map((element) => {
					if (element._id === data._id) return res.event;
					else return element;
				});
				setWaitEvents(newWaitUpdate);
			} else if (res.event.status === 'chegada') {
				if (waitEvents.find((element) => element._id === res.event._id)) return;
				setWaitEvents([...waitEvents, res.event].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()));
			} else {
				setWaitEvents(waitEvents.filter((element) => element._id !== res.event._id));
			}
			if (setOpen) setOpen(false);
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const initEvent = async (eventId: string, setWEvents: (events: IEvent[]) => void, wEvents: IEvent[], setShowEventActive: (value: boolean) => void) => {
		if (!wEvents) return;
		try {
			const currentUser = verifyUser();
			const data = { eventId, atendStart: new Date() };
			const res = await initEventStatus(data, currentUser);
			// evitar nova req de eventos, apenas atualiza os eventos com o resultado da req "initEventStatus"
			const newUpdate = wEvents.map((element) => {
				if (element._id === eventId) return res.event;
				else return element;
			});
			setWEvents(newUpdate);
			setShowEventActive(true);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const eventEnd = async (data: IEvent) => {
		if (!events) return;
		try {
			const currentUser = verifyUser();
			data.status = 'atendido';
			const res = await changeEventStatus(data, currentUser);
			const newUpdate = events.map((element) => {
				if (element._id === data._id) return res.event;
				else return element;
			});

			// console.log(newUpdate);
			setEvents(newUpdate);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	const changeConfirmed = async (data: IEvent, confirmed: '0' | '1' | '2') => {
		if (!events) return;
		try {
			const currentUser = verifyUser();
			data.confirmed = confirmed;
			const res = await changeConfirmedApi(data, currentUser);
			const newUpdate = events.map((element) => {
				if (element._id === data._id) return res.event;
				else return element;
			});
			setEvents(newUpdate);
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	return {
		getEvents,
		getWaitEvents,
		createEvent,
		updateEvent,
		eventDropUpdate,
		eventDelete,
		eventChangeStatus,
		initEvent,
		eventEnd,
		changeConfirmed,
		loading,
		loadingEvents,
	};
};

export default useEvents;
