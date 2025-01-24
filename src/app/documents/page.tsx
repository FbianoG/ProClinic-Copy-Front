'use client';
import Header from '@/components/shared/Header';
import DocumentList from './DocumentList';
import ModalDocument from './ModalDocument';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { IDocument } from '@/interfaces/document';

const Documents = () => {
	const [showModal, setShowModal] = useState<boolean | IDocument>(false);
	const [documentData, setDocumentData] = useState<IDocument | null>(null);

	return (
		<>
			<Header />
			<main className='overflow-x-auto p-4 md:px-8 lg:px-16'>
				<div className='mb-8 flex flex-col items-center gap-2 gap-y-4 md:flex-row md:justify-between'>
					<h1 className='text-2xl font-medium text-primary'>Termos e Documentos</h1>
					<Button
						onClick={() => {
							setShowModal(true);
							setDocumentData(null);
						}}
						className='flex items-center gap-2'>
						Adicionar Documento <Plus size={15} />
					</Button>
				</div>

				<DocumentList setShowModal={setShowModal} setDocumentData={setDocumentData} />

				{showModal && <ModalDocument setShowModal={setShowModal} documentData={documentData} />}
			</main>
		</>
	);
};

export default Documents;
