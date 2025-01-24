'use client';

import Loader from '@/components/shared/Loader';
import { useClinicContext } from '@/context/ClinicContext';
import { usePlansContext } from '@/context/PlansContext';
import useCombo from '@/hooks/useCombo';
import useEvents from '@/hooks/useEvents';
import { IEvent } from '@/interfaces/event';
import { chooseColor } from '@/utils/bgGenerator';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import Modal from './ModalCreateEvent';
import ModalEdit from './ModalEdit';
import { useSelectDoctorContext } from '@/context/SelectDoctor';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventContext } from '@/context/EventContext';
import CalendarEvent from './CalendarEvent';
import { useCalendarViewType } from '@/context/CalendarViewType';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const Calendar = () => {
	const { events } = useEventContext();
	const { clinic } = useClinicContext();
	const { plans } = usePlansContext();
	const { selectDoctor } = useSelectDoctorContext();
	const { calendarTypeView, setCalendarTypeView } = useCalendarViewType();

	const { getAgenda, loading } = useCombo();
	const { getEvents, eventDropUpdate, loadingEvents } = useEvents();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
	const [preEvent, setPreEvent] = useState<DateSelectArg>();
	const [preEventEdit, setPreEventEdit] = useState<IEvent>();
	const [currentDate, setCurrentDate] = useState<Date>(() => {
		const today = new Date();
		const dayOfWeek = today.getDay();
		today.setDate(today.getDate() - dayOfWeek);
		today.setHours(0, 0, 0, 0);
		return today;
	});

	const calendarRef = useRef<FullCalendar | null>(null);
	const intervalRef = useRef<number | null>(null); // Ref para armazenar o identificador do intervalo

	useEffect(() => {
		getAgenda();
	}, []);

	const handleDateSelect = (e: DateSelectArg) => {
		setPreEvent(e);
		setShowModal(true); // abre o modal
	};

	const handleEventSelect = (e: EventClickArg) => {
		const ev = {
			...e.event.extendedProps,
			start: e.event.startStr.slice(0, 16),
			end: e.event.endStr.slice(0, 16),
			title: e.event.title,
		} as IEvent;
		setPreEventEdit(ev);
		setShowModalEdit(true);
	};

	const todayDate = (type: any) => {
		if (!calendarRef.current) return;
		const calendarApi = calendarRef.current.getApi();
		const today = new Date();
		const dayOfWeek = today.getDay();
		today.setDate(today.getDate() - dayOfWeek);

		if (type === 'day') calendarApi.gotoDate(new Date());
		else calendarApi.gotoDate(today);
		setCurrentDate(today);
		getEvents(today);
	};

	const nextDate = () => {
		if (!calendarRef.current) return;

		const today = new Date(currentDate);
		const dayOfWeek = today.getDay();
		const daysUntilNextMonday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
		const nextMonday = new Date(today.setDate(today.getDate() + daysUntilNextMonday));

		const calendarApi = calendarRef.current.getApi();
		calendarApi.gotoDate(nextMonday);

		setCurrentDate(nextMonday);
		getEvents(nextMonday);
	};

	const prevDate = () => {
		if (!calendarRef.current) return;
		const today = new Date(currentDate);
		const dayOfWeek = today.getDay();
		const daysUntilPreviousSunday = dayOfWeek === 0 ? 7 : dayOfWeek + 1;
		const previousMonday = new Date(today.setDate(today.getDate() - daysUntilPreviousSunday));

		const calendarApi = calendarRef.current.getApi();
		calendarApi.gotoDate(previousMonday);

		setCurrentDate(previousMonday);
		getEvents(previousMonday);
	};

	useEffect(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = window.setInterval(() => {
			getEvents(currentDate);
		}, 120000);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null; // Reseta o intervalo
			}
		};
	}, [currentDate]);

	return (
		<div className='waitList mt-4 flex-1 overflow-y-auto px-4 pb-4'>
			{showModal && preEvent && <Modal preEvent={preEvent} setOpen={setShowModal} open={showModal} />}

			{showModalEdit && preEventEdit && <ModalEdit preEvent={preEventEdit} setOpen={setShowModalEdit} open={showModalEdit} />}

			{clinic && events && plans && !loading && (
				<div className='min-w-[900px] flex-1 overflow-y-auto' style={calendarTypeView === 'timeGridDay' ? { minWidth: '100%' } : {}}>
					<div style={calendarTypeView === 'timeGridDay' ? { justifyContent: 'right' } : {}} className='sticky left-0 flex gap-6 md:justify-between'>
						{calendarTypeView === 'timeGridWeek' && (
							<div className='flex gap-1'>
								<Button disabled={loadingEvents} onClick={prevDate} title='Semana Anterior'>
									<ChevronLeft />
								</Button>

								<Button disabled={loadingEvents} onClick={todayDate}>
									Hoje
								</Button>

								<Button disabled={loadingEvents} onClick={nextDate} title='Próxima Semana'>
									<ChevronRight />
								</Button>
							</div>
						)}

						<div className='flex gap-1'>
							<Button
								disabled={calendarTypeView === 'timeGridDay' && true}
								onClick={() => {
									calendarRef.current?.getApi().today();
									calendarRef.current?.getApi().changeView('timeGridDay');
									setCalendarTypeView('timeGridDay');
									todayDate('day');
								}}
								title='Semana Anterior'>
								Dia
							</Button>

							<Button
								disabled={calendarTypeView === 'timeGridWeek' && true}
								onClick={() => {
									calendarRef.current?.getApi().changeView('timeGridWeek');
									setCalendarTypeView('timeGridWeek');
								}}>
								Semana
							</Button>
						</div>
					</div>

					<div aria-label='progress' className='-mb-2 mt-3 h-1 w-full bg-secondary'>
						{loadingEvents && <div className='progress h-full bg-primary'></div>}
					</div>

					<FullCalendar
						initialView={calendarTypeView} // Define a visualização inicial como grade semanal com horários.
						// viewDidMount={(e) => setDayView(e.view.type as 'timeGridDay' | 'timeGridWeek')}
						// datesSet={(e) => setDayView(e.view.type as 'timeGridDay' | 'timeGridWeek')}
						height='auto' // Define a altura do calendário como automática, ajustando-se ao conteúdo.
						// key={JSON.stringify(events)} // Comenta a chave, usada para forçar a renderização do calendário ao mudar os eventos.
						ref={calendarRef} // Define uma referência para acessar o calendário programaticamente.
						allDaySlot={false} // Remove a linha de eventos que ocupam o dia inteiro.
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Ativa os plugins necessários para diferentes visualizações e interações.
						// Configura a visualização inicial como grade semanal com horários.
						slotDuration='00:10:00' // Define cada intervalo de tempo no calendário com duração de 10 minutos.
						slotLabelInterval='00:20:00' // Exibe labels no eixo de tempo a cada 20 minutos.
						slotMinTime={clinic?.start} // Define o horário de início do dia (puxado das configurações da clínica).
						slotMaxTime={clinic?.end} // Define o horário de fim do dia (puxado das configurações da clínica).
						slotLabelFormat={{
							hour: '2-digit',
							minute: '2-digit',
							hour12: false, // Configura as horas no formato 24h (não usa AM/PM).
						}}
						weekends={false} // Habilita a exibição de finais de semana.
						locale='pt' // Define o idioma para português do Brasil.
						eventMaxStack={4} // Limita a quantidade de eventos sobrepostos antes de agrupar com "mais...".
						nowIndicator={true} // Adiciona um marcador indicando o horário atual.
						eventClick={handleEventSelect} // Define a função disparada ao clicar em um evento.
						editable={true} // Permite mover ou redimensionar eventos.
						selectMirror={true} // Exibe um evento "espelhado" temporário ao selecionar horários.
						eventDrop={eventDropUpdate} // Função chamada ao mover um evento para outro horário.
						eventResize={eventDropUpdate} // Função chamada ao redimensionar um evento.
						selectable={true} // Permite selecionar horários vazios no calendário.
						select={handleDateSelect} // Define a função disparada ao selecionar horários vazios.
						events={events?.filter((event) => {
							if (selectDoctor) return event && event.start && event.end && event.doctor === selectDoctor;
							else return event && event.start && event.end;
						})} // Filtra a lista de eventos para incluir apenas aqueles com início e fim definidos.
						eventDidMount={chooseColor} // Aplica cores personalizadas aos eventos após renderizá-los.
						businessHours={{
							daysOfWeek: [1, 2, 3, 4, 5], // Define o horário comercial de segunda a sexta.
							startTime: clinic?.start, // Horário comercial de início.
							endTime: clinic?.end, // Horário comercial de fim.
						}}
						selectConstraint={{
							startTime: clinic?.start, // Impede seleção antes do horário de início comercial.
							endTime: clinic?.end, // Impede seleção após o horário de fim comercial.
							daysOfWeek: [1, 2, 3, 4, 5], // Bloqueia seleção nos finais de semana.
						}}
						eventContent={(eventInfo) => <CalendarEvent eventInfo={eventInfo} />} // Eventos
						headerToolbar={{
							start: '', // Botões de navegação padrão
							center: '', // Título central
							end: '', // Botão personalizado
						}}

						// select={addPatient} // Linha comentada: função para lidar com seleção de horários vazios.
						// slotEventOverlap={false} // Linha comentada: configuraria para eventos não se sobreporem.
						// dayMaxEvents={true} // Linha comentada: agruparia eventos excedentes.
					/>
				</div>
			)}

			{loading && (
				<div className='pt-40'>
					<Loader text='Carregando Agenda' />
				</div>
			)}
		</div>
	);
};

export default Calendar;
