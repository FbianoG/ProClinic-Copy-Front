'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
	searchPatients: (data: { name?: string; cpf?: string }) => void;
}

const SearchPatient = ({ searchPatients }: Props) => {
	const { register, handleSubmit } = useForm<{ name: string; cpf: string }>();

	return (
		<form onSubmit={handleSubmit(searchPatients)} className='flex w-full flex-wrap items-end gap-4 gap-y-1'>
			<div className='w-[300px]'>
				<Label>Nome</Label>
				<Input type='text' {...register('name')} className='bg-card' />
			</div>

			<div className='w-[150px]'>
				<Label>CPF</Label>
				<Input type='text' {...register('cpf')} className='bg-card' />
			</div>
			<Button className='flex items-center gap-2'>
				<Search size={17} />
				Pesquisar
			</Button>
		</form>
	);
};

export default SearchPatient;
