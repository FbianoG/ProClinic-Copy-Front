'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useClinicContext } from '@/context/ClinicContext';
import { usePlansContext } from '@/context/PlansContext';
import { useUserContext } from '@/context/UserContext';
import useClinic from '@/hooks/useClinic';
import usePlans from '@/hooks/usePlans';
import { IPlan } from '@/interfaces/iplan';
import { IPatient } from '@/interfaces/patients';
import { Toast } from '@/utils/Toast';
import { Delete, FileText, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Procedimento {
	procedimento: string;
	codigo: string;
}

interface Procediments {
	proced: string;
	tuss: string;
	qtd: string;
}

interface Props {
	setShowFormGuia: (state: boolean) => void;
	patient: IPatient;
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const FormGuia = ({ setShowFormGuia, patient }: Props) => {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const { getPlans } = usePlans();

	const { getClinic } = useClinic();

	const { plans } = usePlansContext();

	const { user } = useUserContext();

	const { clinic } = useClinicContext();

	const [search, setSearch] = useState<Procedimento[] | null>(null);

	const [procedimetos, setProcedimentos] = useState<Procediments[]>([]);

	const [isInt, setIsInt] = useState<boolean>(false);

	useEffect(() => {
		getPlans();
		if (!clinic) {
			getPlans();
			getClinic();
		} else {
			getPlans();
		}
	}, []);

	const searchTuss = async (value: string) => {
		try {
			if (value.length < 3) {
				setSearch(null);
				return;
			}
			const res = await fetch('/json/tuss.json');
			const data = await res.json();
			if (isNaN(Number(value))) {
				const search = data
					.filter((element: Procedimento) => element.procedimento.toLowerCase().includes(value.toLowerCase()))
					.sort((b: Procedimento, a: Procedimento) => a.procedimento.localeCompare(b.procedimento));
				setSearch(search);
			} else {
				const search = data
					.filter((element: Procedimento) => element.codigo.includes(value))
					.sort((b: Procedimento, a: Procedimento) => a.procedimento.localeCompare(b.procedimento));
				setSearch(search);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const selectProced = (element: Procedimento) => {
		setValue('proced', element.procedimento);
		setValue('tuss', element.codigo);
		setValue('qtd', '1');
		setSearch(null);
	};

	const addProced = () => {
		if (procedimetos.length >= 5) {
			Toast('Erro', 'Limite de procedimentos atingido.', '⛔');
			return;
		}
		const data = { proced: getValues('proced'), tuss: getValues('tuss'), qtd: getValues('qtd') };
		if (data.proced.trim() === '' || data.tuss.trim() === '' || data.qtd.trim() === '') {
			Toast('Erro', 'Preencha todos os campos.', '⛔');
			return;
		}
		setProcedimentos([...procedimetos, data]);
		setValue('proced', '');
		setValue('tuss', '');
		setValue('qtd', '');
	};

	const gerateGuia = (data: any) => {
		if (!user || !clinic || !plans) {
			Toast('Erro', 'Erro ao gerar guia', '⛔');
			return;
		}
		data.name = patient.name;

		data.src = plans.find((plan: IPlan) => plan._id === patient.plan)?.src as string;
		data.planNumber = patient.planNumber;
		data.doctor = user.name;
		data.crm = user.crm as string;
		data.cbo = user.cbo as string;
		data.contratado = clinic.name;
		data.cnpj = clinic.cnpj;
		data.proced = procedimetos;
		console.log(isInt);
		data.typeGuia = isInt ? 'int' : 'sadt';
		localStorage.setItem('Guia', JSON.stringify(data));
		window.open('/guia', '_blank');
	};

	return (
		<div className='fixed left-0 top-0 z-50 h-screen w-screen'>
			<div className='fixed left-0 top-0 h-full w-full bg-black bg-opacity-70'></div>
			<form
				onSubmit={handleSubmit(gerateGuia)}
				className='modal absolute left-1/2 top-1/2 flex h-max w-[512px] max-w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-card p-4 shadow-lg'>
				<div className='flex items-center justify-between'>
					<h3 className='text-center text-2xl font-medium text-primary'>Gerar Guia</h3>

					<div className='flex items-center justify-center gap-2'>
						<Label>SADT</Label>
						<Switch onCheckedChange={(e) => setIsInt(e)} />
						<Label>INTE</Label>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<Label className='w-[170px] text-primary'>Número de Guia:</Label>
					<Input className='h-7 flex-1 rounded' {...register('guia')} />
				</div>

				<div className='flex items-center gap-2'>
					<Label className='w-[170px] text-primary'>Senha:</Label>
					<Input className='h-7 flex-1 rounded' {...register('senha')} />
				</div>

				<div className='flex items-center gap-2' style={isInt ? { alignItems: 'start' } : {}}>
					<Label className='w-[170px] text-primary'>Indicação Clínica:</Label>
					{isInt ? <Textarea className='h-12 flex-1 resize-none rounded py-2' {...register('ind')} /> : <Input className='h-7 flex-1 rounded' {...register('ind')} />}
				</div>

				{isInt && (
					<div className='flex items-center gap-2' style={isInt ? { alignItems: 'start' } : {}}>
						<Label className='w-[170px] text-primary'>Observação:</Label>
						<Textarea className='h-12 flex-1 resize-none rounded py-2' {...register('obs')} />
					</div>
				)}

				<div className='flex items-center gap-2'>
					<Label className='w-[170px] text-primary'>Caráter do Procedimento:</Label>
					<select className='h-7 flex-1 rounded border px-2 text-sm outline-none focus:border-primary' {...register('carater')}>
						<option value='2'>Eletivo</option>
						<option value='1'>Urgência</option>
					</select>
				</div>

				<div className='flex items-center gap-2'>
					<Label className='w-[170px] text-primary'>Data da Solicitação:</Label>
					<Input type='date' className='h-7 w-max rounded' defaultValue={new Date().toISOString().split('T')[0]} {...register('dateSol')} />
				</div>

				{isInt && (
					<div className='flex items-center gap-2'>
						<Label className='w-[170px] text-primary'>Dados da Internação:</Label>
						<div className='flex gap-2'>
							<select className='h-7 w-max rounded border bg-card px-2 text-sm outline-none focus:border-primary' {...register('type')}>
								<option value='' disabled selected>
									Tipo de Internação
								</option>
								<option value='1'>Clínica</option>
								<option value='2'>Cirúrgica</option>
								<option value='4'>Pediátrica</option>
								<option value='3'>Ginecológica</option>
							</select>
							<select className='h-7 w-max rounded border px-2 text-sm outline-none focus:border-primary' {...register('diaria')}>
								<option value='' disabled selected>
									Diárias
								</option>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
								<option value='7'>7</option>
								<option value='8'>8</option>
								<option value='9'>9</option>
							</select>
						</div>
					</div>
				)}

				<div className='flex flex-col gap-2 border-t py-2'>
					<div className='relative flex items-center gap-2'>
						<Label className='w-[170px] text-primary'>Procedimento:</Label>
						<Input
							autoComplete='off'
							className='h-7 flex-1 rounded'
							{...register('proced')}
							onChange={(e) => {
								searchTuss(e.target.value);
							}}
						/>
						{search && (
							<ul className='absolute left-44 top-[110%] flex max-h-72 w-[305px] list-none flex-col gap-1 overflow-y-auto rounded border border-primary bg-card p-1 text-sm shadow'>
								{search.length > 0 &&
									search.map((element: Procedimento) => (
										<li key={element.codigo} onClick={() => selectProced(element)} className='cursor-pointer rounded p-1 duration-300 hover:bg-secondary'>
											{`${element.codigo} - ${element.procedimento}`}
										</li>
									))}
								{search.length === 0 && <li className='rounded p-1'>Nenhum procedimento encontrado</li>}
							</ul>
						)}
					</div>

					<div className='flex items-center gap-2'>
						<Label className='w-[170px] text-primary'>Cod. TUSS:</Label>
						<Input className='h-7 flex-1 rounded' {...register('tuss')} />
					</div>

					<div className='flex items-center gap-2'>
						<Label className='w-[170px] text-primary'>Quantidade:</Label>
						<Input className='h-7 flex-1 rounded' {...register('qtd')} />
					</div>
				</div>

				<Button type='button' title='Adicionar Procedimento' onClick={addProced} className='mx-auto h-6 w-6 rounded-full bg-green-500 p-0 hover:bg-green-400'>
					<Plus size={20} />
				</Button>

				<ul className='mt-2 flex flex-col gap-2 border-y py-2'>
					{procedimetos.map((element, index) => (
						<li key={index} className='flex items-center gap-2 text-xs'>
							<span className='px-1'>{element.tuss}</span>
							<span className='flex-1 truncate px-1'>{element.proced}</span>
							<span className='px-1'>{element.qtd.padStart(2, '0')}</span>
							<Button
								type='button'
								variant='link'
								title='Remover Procedimento'
								onClick={() => setProcedimentos(procedimetos.filter((_, i) => i !== index))}
								className='h-max p-0 text-destructive duration-300 hover:opacity-70'>
								<Delete size={15} />
							</Button>
						</li>
					))}
				</ul>

				<div className='mt-4 flex justify-end gap-2'>
					<Button type='button' variant='ghost' title='Fechar' onClick={() => setShowFormGuia(false)} className='text-destructive duration-300 hover:opacity-70'>
						Fechar
					</Button>
					<Button type='submit' title='Adicionar Procedimento' className='flex items-center gap-2'>
						Gerar Guia
						<FileText size={17} />
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FormGuia;
