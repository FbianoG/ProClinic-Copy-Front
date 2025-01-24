'use Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClinicContext } from '@/context/ClinicContext';
import useClinic from '@/hooks/useClinic';
import { IPatient } from '@/interfaces/patients';
import { FileText, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	setshowFormReceit: (a: boolean) => void;
	patient: IPatient;
}

const FormReceit = ({ patient, setshowFormReceit }: Props) => {
	const { register, handleSubmit } = useForm();

	const { clinic } = useClinicContext();

	const { getClinic } = useClinic();

	const [typeReceit, setTypeReceit] = useState<string>('');

	const [textValue, setTextValue] = useState<string>('');

	const atest = `Atesto, para os devidos fins, que o paciente supracitado está temporariamente incapacitado de exercer suas atividades laborais pelo período de ____ dias, a contar desta data, conforme avaliação médica realizada.`;

	const comp = `Atesto, para os devidos fins, que o(a) Sr(a). ${patient.name.toUpperCase()}, portador(a) do CPF nº ${patient.cpf || '______________'}, compareceu a esta unidade de saúde em ____/____/____, no horário de ____ às ____, para consulta/atendimento médico.`;

	const compAcomp = `Atesto, para os devidos fins, que o(a) Sr(a). _____________________________, portador(a) do CPF nº ______________, acompanhou o(a) paciente ${patient.name.toUpperCase()} em consulta/atendimento nesta unidade de saúde, realizado em ____/____/____, no horário de ____ às ____.`;

	useEffect(() => {
		if (!clinic) {
			getClinic();
		}
	}, []);

	useEffect(() => {
		if (typeReceit === 'atestado') {
			setTextValue(atest);
		}
		if (typeReceit === 'comparecimento') {
			setTextValue(comp);
		}
		if (typeReceit === 'comparecimentoAcomp') {
			setTextValue(compAcomp);
		}
	}, [typeReceit]);

	const createReceit = (data: any) => {
		data.text = textValue;
		data.typeGuia = 'receit';
		data.name = patient.name;
		data.src = clinic?.src;
		data.phone = clinic?.phone;
		data.clinic = clinic?.name;
		data.cnpj = clinic?.cnpj;
		data.address = clinic?.address;
		localStorage.setItem('Guia', JSON.stringify(data));
		window.open('/guia', '_target');
	};

	return (
		<div className='fixed left-0 top-0 z-50 h-screen w-screen'>
			<div onClick={() => setshowFormReceit(false)} className='h-full w-full bg-black bg-opacity-70'></div>
			<form
				onSubmit={handleSubmit(createReceit)}
				className='modal absolute left-1/2 top-1/2 flex h-max w-[512px] max-w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-card p-4 shadow-lg'>
				<Button onClick={() => setshowFormReceit(false)} variant='link' title='Fechar' className='absolute right-4 top-4 text-foreground duration-300 hover:opacity-70'>
					<X size={15} />
				</Button>
				<h3 className='text-center text-2xl font-medium text-primary'>Receituário</h3>
				<div className=''>
					<Label>Documento:</Label>
					<Select onValueChange={(value) => setTypeReceit(value)}>
						<SelectTrigger id='plan'>
							<SelectValue placeholder='Selecione o Documento' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='atestado'>Atestado</SelectItem>
								<SelectItem value='comparecimento'>Comparecimento</SelectItem>
								<SelectItem value='comparecimentoAcomp'>Comparecimento Acompanhante</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='flex gap-4'>
					<div>
						<Label>Data:</Label>
						<Input type='date' defaultValue={new Date().toLocaleDateString().split('/').reverse().join('-')} {...register('date')} className='w-max' />
					</div>
					<div className=''>
						<Label>Hora:</Label>
						<Input type='Time' {...register('time')} className='w-max' defaultValue={new Date().toLocaleTimeString().slice(0, 5)} />
					</div>
				</div>
				<div className='mt-4 flex flex-col'>
					<Label>Texto:</Label>
					<textarea
						value={textValue}
						onChange={(value) => setTextValue(value.target.value)}
						className='h-44 resize-none rounded border bg-card p-2 outline-none focus:border-primary'></textarea>
				</div>
				<div className='mt-4 flex items-center justify-end gap-2'>
					<Button type='button' variant='secondary' disabled className='flex items-center gap-2 text-green-500'>
						<MessageCircle size={17} />
						Enviar por WhatsApp
					</Button>
					<Button type='submit' title='Adicionar Procedimento' className='flex items-center gap-2'>
						<FileText size={17} />
						Gerar Receituário
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FormReceit;
