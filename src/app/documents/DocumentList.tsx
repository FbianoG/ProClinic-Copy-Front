'use client';

import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { useDocumentsContext } from '@/context/DocumentContext';
import useDocuments from '@/hooks/useDocuments';
import { IDocument } from '@/interfaces/document';
import { ArrowDown, ArrowUp, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

interface Props {
	setShowModal: (value: boolean) => void;
	setDocumentData: (value: IDocument | null) => void;
}

const DocumentList = ({ setDocumentData, setShowModal }: Props) => {
	const { documents } = useDocumentsContext();

	const { getDocuments, loading } = useDocuments();

	const [filter, setFilter] = useState<'name' | 'size' | 'category' | 'date'>('name');

	useEffect(() => {
		if (!documents) getDocuments();
	}, []);

	const openLink = (link: string) => {
		window.open(link, '_blank');
	};

	return (
		<section>
			<div className='waitList w-full overflow-auto rounded bg-card p-4 shadow'>
				<div className='flex min-w-max gap-1 border-b p-4 pt-0 font-bold'>
					<p onClick={() => setFilter('name')} className='flex w-80 cursor-pointer items-center gap-1'>
						Documento
						{filter === 'name' && <ArrowDown size={15} />}
					</p>
					<p onClick={() => setFilter('size')} className='flex w-32 cursor-pointer items-center justify-center gap-1'>
						Tamanho
						{filter === 'size' && <ArrowDown size={15} />}
					</p>
					<p onClick={() => setFilter('date')} className='flex w-32 cursor-pointer items-center justify-center gap-1'>
						Editado em
						{filter === 'date' && <ArrowDown size={15} />}
					</p>
					<p onClick={() => setFilter('category')} className='flex w-32 cursor-pointer items-center justify-center gap-1'>
						Tipo
						{filter === 'category' && <ArrowUp size={15} />}
					</p>
					<p className='ml-auto'>{documents && (documents?.reduce((acc, doc) => acc + doc.size, 0) / 1024 / 1024).toFixed(2)}Mb / 250Mb</p>
				</div>

				{loading && !documents && (
					<div className='grid w-full py-20'>
						<Loader text='Carregando documentos' />
					</div>
				)}
				{documents && documents.length == 0 && <p className='w-full py-20 text-center'>Nenhum documento encontrado.</p>}

				<ul>
					{filter &&
						documents &&
						documents.length > 0 &&
						documents
							.sort((a, b) => {
								if (filter === 'size') return a.size - b.size;
								else if (filter === 'category') return b.category.localeCompare(a.category);
								else if (filter === 'date') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
								else return a[filter].localeCompare(b[filter]);
							})
							.map((document) => {
								return (
									<li
										key={document._id}
										className='flex min-w-max cursor-pointer items-center gap-1 border-b bg-card p-4 capitalize duration-300 last:border-b-0 hover:bg-background'>
										<div className='flex gap-1 group' onClick={() => openLink(document.src)}>
											<p className='w-80 truncate font-semibold capitalize duration-300 group-hover:text-primary'>{document.name}</p>
											<p className='w-32 text-center opacity-70'>{(document.size / 1024 / 1024).toFixed(2)}MB</p>
											<p className='w-32 text-center opacity-70'>{new Date(document.updatedAt).toLocaleDateString()}</p>
											<p
												style={
													(document.category === 'termos' && { color: '#5d93b7' }) ||
													(document.category === 'outros' && { color: '#64bdac' }) ||
													(document.category === 'atendimento' && { color: '#c35e5e' }) || { backgroundColor: '#fcd34d' }
												}
												className='grid w-32 place-items-center rounded font-semibold'>
												{document.category}
											</p>
										</div>
										<Button
											variant='link'
											onClick={() => {
												setShowModal(true);
												setDocumentData(document);
											}}
											className='ml-auto flex items-center gap-2 duration-300 hover:opacity-70'>
											<Edit size={15} />
											Editar
										</Button>
									</li>
								);
							})}
				</ul>
			</div>
		</section>
	);
};

export default DocumentList;
