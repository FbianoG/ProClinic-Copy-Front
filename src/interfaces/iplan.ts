export interface IPlan {
	_id: string;
	cod?: string;
	email?: string;
	login?: string;
	obs?: string;
	password?: string;
	name: string;
	tel?: string;
	web?: string;
	src?: string;
	tuss?: Procedimento[];
}

interface Procedimento {
	procedimento: string;
	codigo: string;
	price?: number;
}
