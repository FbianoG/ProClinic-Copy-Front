export interface IPatient {
	_id: string;
	clinicId: string;
	patientId?: string;
	name: string;
	nasc: Date | string;
	cpf: string;
	mother: string;
	phone: string;
	email: string;
	plan: string;
	planNumber: string;
	address: string;
	addressNumber: string;
	neighborhood: string;
	city: string;
	state: string;
	cep: string;
	gender: 'mas' | 'fem';
}
