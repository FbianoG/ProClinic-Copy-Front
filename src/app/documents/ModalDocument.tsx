'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useDocuments from '@/hooks/useDocuments';
import { IDocument } from '@/interfaces/document';
import { Delete, FilePlus2, Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	setShowModal: (value: boolean) => void;
	documentData: IDocument | null;
}

const ModalDocument = ({ setShowModal, documentData }: Props) => {
	const { register, setValue, handleSubmit } = useForm<IDocument & { file: any }>();

	const { createDocument, updateDocument, deleteDocument, loading } = useDocuments();

	useEffect(() => {
		if (documentData) {
			setValue('_id', documentData._id);
			setValue('name', documentData.name);
			setValue('category', documentData.category);
		}
	}, []);

	const handleClick = (data: IDocument & { file: any }) => {
		if (loading) return;
		if (documentData) updateDocument(data, setShowModal);
		else createDocument(data, setShowModal);
	};

	const handleDelete = () => {
		if (!window.confirm('Tem certeza que deseja excluir o documento?')) return;
		deleteDocument(documentData as IDocument, setShowModal);
	};

	return (
		<div className='fixed left-0 top-0 z-50 h-dvh w-dvw'>
			<div className='h-full w-full bg-black opacity-70' onClick={() => setShowModal(false)}></div>
			<form
				onSubmit={handleSubmit(handleClick)}
				className='modal absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-card p-4 shadow md:w-[400px]'>
				<h2 className='my-2 text-center text-2xl font-medium text-primary'>{documentData ? 'Editar Documento' : 'Adicionar Documento'}</h2>

				<Button title='Fechar' variant={'link'} onClick={() => setShowModal(false)} className='absolute right-3 top-3 text-card-foreground duration-300 hover:opacity-70'>
					<X size={15} />
				</Button>

				<div className=''>
					<Label>Nome</Label>
					<Input defaultValue={documentData?.name} {...register('name', { required: 'Preencha o nome' })} required />
				</div>
				<div className=''>
					<Label>Categoria</Label>
					<Select
						defaultValue={documentData?.category}
						onValueChange={(value) => setValue('category', value)}
						{...register('category', { required: 'Selecione a categoria' })}
						required>
						<SelectTrigger id='gender'>
							<SelectValue placeholder='Selecione a categoria' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='termos'>Termos</SelectItem>
								<SelectItem value='atendimento'>Atendimento</SelectItem>
								<SelectItem value='outros'>Outros</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className=''>
					<Label>
						Documento - PDF <span className='italic opacity-70'>(max 4mb)</span>
					</Label>
					<Input type='file' accept='.pdf' {...register('file')} required={documentData ? false : true} />
				</div>
				<div className='mt-4 flex items-center justify-between'>
					<Button
						type='button'
						variant='ghost'
						title='Excluir documento'
						aria-label='Excluir documento'
						onClick={handleDelete}
						disabled={loading || !documentData}
						className='text-destructive'>
						<Delete size={18} />
					</Button>

					<Button type='submit' disabled={loading} className='flex items-center gap-2'>
						{loading && (
							<>
								<Loader2 size={15} className='animate-spin' />
								Prcessando...
							</>
						)}
						{!loading && !documentData && 'Adicionar Documento'}
						{!loading && documentData && 'Editar Documento'}
						{!loading && <FilePlus2 size={15} />}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ModalDocument;
