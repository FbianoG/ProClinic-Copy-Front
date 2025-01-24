'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import usePlans from '@/hooks/usePlans';
import { IPlan } from '@/interfaces/iplan';
import { Delete, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
	plan: IPlan;
}

interface Procedimento {
	procedimento: string;
	codigo: string;
	price?: number;
}

const FormEditProced = ({ plan }: Props) => {
	const [search, setSearch] = useState<Procedimento[] | null>(null);

	const { editTussPlan } = usePlans();

	const [planProced, setplanProced] = useState<Procedimento[]>();

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
					.sort((a: Procedimento, b: Procedimento) => a.procedimento.localeCompare(b.procedimento));
				setSearch(search);
			} else {
				const search = data
					.filter((element: Procedimento) => element.codigo.includes(value))
					.sort((a: Procedimento, b: Procedimento) => a.procedimento.localeCompare(b.procedimento));
				setSearch(search);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const selectProced = (element: Procedimento) => {
		if (planProced) {
			if (planProced.find((item) => item.codigo === element.codigo)) return;
			setplanProced([...planProced, element]);
		} else setplanProced([element]);
	};

	useEffect(() => {
		if (plan) {
			setplanProced(plan.tuss);
		}
	}, [plan]);

	const handleEditTuss = (e: React.FormEvent<HTMLFormElement>, element: Procedimento) => {
		e.preventDefault();
		editTussPlan(plan, { ...element, price: Number(e.currentTarget.price.value) });
	};

	return (
		<div className='flex max-h-full flex-col gap-2 p-4'>
			<h2 className='mb-4 text-center mr-auto text-xl font-medium text-primary capitalize'>{plan.name} - TUSS </h2>

            <Label>Procedimentos Cadastrados:</Label>
			<ul className='waitList max-h-60 overflow-y-auto text-sm'>
				{planProced &&
					planProced.length > 0 &&
					planProced.map((element: Procedimento, index) => (
						<form key={index} onSubmit={(e) => handleEditTuss(e, element)}>
							<li title={element.procedimento} className='flex items-center gap-2 p-1 duration-300 hover:bg-muted'>
								<p>{element.codigo}</p>
								<p className='flex-1 truncate'>{element.procedimento}</p>
								<div className='flex items-center'>
									R${' '}
									<Input
										name='price'
										defaultValue={element.price || 0.0}
										className='h-max w-20 border-none border-red-400 p-0 pl-1 shadow-none focus:ring-0 focus-visible:ring-0'
										type='number'
										step={0.01}
										min={0}
									/>
								</div>
								<Button title='Remover Procedimento' type='button' variant='link' className='h-max p-0 text-destructive'>
									<Delete size={15} />
								</Button>
								<Button title='Salvar Procedimento' type='submit' variant='link' className='h-max p-0'>
									<Save size={15} />
								</Button>
							</li>
						</form>
					))}
			</ul>

            <div className="w-full h-1 bg-secondary"></div>

			<div className='relative text-sm'>
				<Label>Adicionar Procedimento:</Label>
				<Input
					className='border-t-transparent border-x-transparent shadow-none focus:ring-0 focus-visible:ring-0 border-b'
					placeholder='Pesquisar'
					autoComplete='off'
					onChange={(e) => {
						searchTuss(e.target.value);
					}}
				/>

				<ul className='waitList mt-1 h-52 w-full overflow-y-auto rounded'>
					{search &&
						search.length > 0 &&
						search.map((element: Procedimento) => (
							<li key={element.codigo} title={element.procedimento} onClick={() => selectProced(element)} className='cursor-pointer truncate rounded p-1 duration-300 hover:bg-secondary'>
								{`${element.codigo} - ${element.procedimento}`}
							</li>
						))}
					{search && search.length === 0 && <li className='rounded p-1'>Nenhum procedimento encontrado</li>}
				</ul>
			</div>

			{/* {!loading && (
				<Button type='submit' className='flex items-center gap-2'>
					Salvar Procedimentos <Save size={15} />
				</Button>
			)} */}
		</div>
	);
};

export default FormEditProced;
