export interface IEvent {
	_id?: string;
	title: string; // nome do paciente
	start: Date | string; // hora de início 
	end: Date | string; // hora de fim
	blocked: 'true' | 'false'; // preEvent
	patientNasc: string; // data de nascimento
	patientId?: string; // se está registrado a um paciente
	phone: string; // telefone do paciente
	plan: string; // id do plano
	planNumber: string; // numero do plano
	doctor: string; // id do medico que irá atender
	status: IEventStatus; // agendado, atendimento, atendido etc
	type: 'consulta' | 'retorno' | 'exame' | 'cirurgia' | 'bloqueado'; // tipo de consulta
	confirm?: Date; // data da confirmação da chegada
	atendStart?: Date | string; // que o médico comecou a atender
	confirmed?: '0' | '1' | '2'; // confirmação do paciente via wpp  '0' - nenhuma, '1' - sim, '2' - nao
	obs?: string;
}
export type IEventStatus = 'cancelado' | 'agendado' | 'atendido' | 'chegada' | 'atendimento' | 'bloqueado'; // preEvent

export interface IEventCreate {
	id?: string;
	phone?: string;
	patientId?: string;
	title?: string;
	start?: string;
	end?: string;
	date?: string;
	blocked?: 'true' | 'false';
	patientNasc?: string;
	plan?: string;
	doctor?: string;
	status: 'cancelado' | 'agendado' | 'atendido' | 'remarcado' | 'chegada' | 'atendimento';
	type?: 'consulta' | 'retorno' | 'exame' | 'cirurgia' | 'fechado';
}

export interface IEventBlock {
	id?: string;
	title: string;
	start: string;
	end: string;
	date: Date;
	blocked: 'true';
	doctor: string;
	type: 'fechado';
}

export interface IEventDateSelect {
	start: Date;
	end: Date;
	startStr: string;
	endStr: string;
	allDay: boolean;
	jsEvent: JSEvent;
	view: View;
}

export interface JSEvent {
	isTrusted: boolean;
}

export interface View {
	type: string;
	dateEnv: DateEnv;
}

export interface DateEnv {
	timeZone: string;
	canComputeOffset: boolean;
	locale: Locale;
	weekDow: number;
	weekDoy: number;
	weekText: string;
	weekTextLong: string;
	cmdFormatter: null;
	defaultSeparator: string;
}

export interface Locale {
	codeArg: string;
	codes: string[];
	week: Week;
	options: Options;
}

export interface Options {
	direction: string;
	buttonText: ButtonText;
	weekText: string;
	weekTextLong: string;
	closeHint: string;
	timeHint: string;
	eventHint: string;
	allDayText: string;
	moreLinkText: string;
	noEventsText: string;
	buttonHints: ButtonHints;
	viewHint: string;
	navLinkHint: string;
}

export interface ButtonHints {
	prev: string;
	next: string;
}

export interface ButtonText {
	prev: string;
	next: string;
	prevYear: string;
	nextYear: string;
	year: string;
	today: string;
	month: string;
	week: string;
	day: string;
	list: string;
}

export interface Week {
	dow: number;
	doy: number;
}
