export interface IMedicalRecord {
	_id?: string;
	patientId: string; // ID do paciente
	doctorId: string; // ID do médico
	date: Date; // Data do atendimento
	dateStart: Date; // Data do atendimento
	dateEnd: Date; // Data do atendimento
	dateConfirm: Date; // Data do atendimento
	complaint?: string; // Queixa principal (opcional)
	currentHistory?: string; // História atual da moléstia (opcional)
	medicalHistory?: string; // Histórico médico (opcional)
	physicalExam?: string; // Exame físico (opcional)
	diagnostic?: string; // Hipóteses diagnósticas (opcional)
	conduct?: string; // Condutas (opcional)
	prescription?: string; // Prescrição (opcional)
}
