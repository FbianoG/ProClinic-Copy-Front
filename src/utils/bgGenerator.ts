// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const chooseColor = (info: any) => {
	const type = info.event.extendedProps.type;
	info.el.style.borderColor = '#fff1';

	switch (type) {
		case 'consulta':
			return (info.el.style.backgroundColor = '#5d93b7');
		case 'exame':
			return (info.el.style.backgroundColor = '#d36cb5');
		case 'cirurgia':
			return (info.el.style.backgroundColor = '#c35e5e');
		case 'retorno':
			return (info.el.style.backgroundColor = '#64bdac');
		case 'bloqueado':
			return (info.el.style.backgroundColor = '#888');
		default:
			return (info.el.style.backgroundColor = '#3498db');
	}
};

export const chooseColorString = (type: string) => {
	
	switch (type) {
		case 'consulta':
			return '#5d93b7';
		case 'exame':
			return '#d36cb5';
		case 'cirurgia':
			return '#c35e5e';
		case 'retorno':
			return '#64bdac';
		case 'bloqueado':
			return '#888';
		default:
			return '#3498db';
	}
};
