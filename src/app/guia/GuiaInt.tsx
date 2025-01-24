import Image from 'next/image';
import './GuiaInt.css';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { IGuia } from '@/interfaces/guia';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	data: IGuia;
}

const GuiaInt = ({ data }: Props) => {
	return (
		<>
			<Button onClick={() => window.print()} className='noPrint fixed left-4 top-4 flex gap-2 print:hidden'>
				<Printer size={15} />
				Imprimir
			</Button>
			<div className='guia w-max border'>
				<Image src='/img/guiaint.png' alt='' width={1000} height={2000} />
				<div className='dados'>
					<p id='guia'>{data.guia}</p>
					<p id='dataAut'></p>
					<p id='senha'>{data.senha}</p>
					<p id='carteira'>{data.planNumber}</p>
					<p id='nome'>{data.name}</p>
					<p id='cnpj1'>{data.cnpj}</p>
					<p id='contratado1'>{data.contratado}</p>
					<p id='medico'>{data.doctor}</p>
					<p id='conselho'>CRM</p>
					<p id='crm'>{data.crm}</p>
					<p id='uf'>RJ</p>
					<p id='cbo'>{data.cbo}</p>
					<p id='cnpj2'>
						{data.contratado === 'chn' && '60884855001207'} {data.contratado === 'hi' && '31671480000308'}
					</p>
					<p id='contratado2'>
						{data.contratado === 'chn' && 'CHN - Complexo Hospitalar de Niterói'} {data.contratado === 'hi' && 'Hospital Icaraí'}
					</p>
					<p id='carater'>{data.carater}</p>
					<p id='tipo'>{data.type}</p>
					<p id='regime'></p>
					<p id='diariaSol'>{data.diaria}</p>
					<p id='opme'>{data.opme}</p>
					<textarea id='anexo' defaultValue={data.ind} disabled></textarea>
					<p id='cid'></p>
					<div className='tuss'>
						<div className='tabela'>
							<p id='tb1'>{data.proced[0]?.tuss && '22'}</p>
							<p id='tb2'>{data.proced[1]?.tuss && '22'}</p>
							<p id='tb3'>{data.proced[2]?.tuss && '22'}</p>
							<p id='tb4'>{data.proced[3]?.tuss && '22'}</p>
							<p id='tb5'>{data.proced[4]?.tuss && '22'}</p>
							<p id='tb5'>{data.proced[5]?.tuss && '22'}</p>
						</div>
						<div className='codigos'>
							<p id='cod1'>{data.proced[0]?.tuss}</p>
							<p id='cod2'>{data.proced[1]?.tuss}</p>
							<p id='cod3'>{data.proced[2]?.tuss}</p>
							<p id='cod4'>{data.proced[3]?.tuss}</p>
							<p id='cod5'>{data.proced[4]?.tuss}</p>
							<p id='cod5'>{data.proced[5]?.tuss}</p>
						</div>
						<div className='descricao'>
							<p id='des1'>{data.proced[0]?.proced}</p>
							<p id='des2'>{data.proced[1]?.proced}</p>
							<p id='des3'>{data.proced[2]?.proced}</p>
							<p id='des4'>{data.proced[3]?.proced}</p>
							<p id='des5'>{data.proced[4]?.proced}</p>
							<p id='des5'>{data.proced[5]?.proced}</p>
						</div>
						<div className='quantidade'>
							<p>{data.proced[0]?.qtd === '' ? '' : data.proced[0]?.qtd.toString().padStart(2, '0')}</p>
							<p>{data.proced[1]?.qtd === '' ? '' : data.proced[1]?.qtd.toString().padStart(2, '0')}</p>
							<p>{data.proced[2]?.qtd === '' ? '' : data.proced[2]?.qtd.toString().padStart(2, '0')}</p>
							<p>{data.proced[3]?.qtd === '' ? '' : data.proced[3]?.qtd.toString().padStart(2, '0')}</p>
							<p>{data.proced[4]?.qtd === '' ? '' : data.proced[4]?.qtd.toString().padStart(2, '0')}</p>
							<p>{data.proced[5]?.qtd === '' ? '' : data.proced[5]?.qtd.toString().padStart(2, '0')}</p>
						</div>
						{/* <div className='quantidadeAut'>
							<p>{data.proced[0].qtd1 === '' ? '' : data.proced[0].qtd?.toString().padStart(2, '0')}</p>
							<p>{data[0].qtd2 === '' ? '' : data[0].qtd2?.toString().padStart(2, '0')}</p>
							<p>{data[0].qtd3 === '' ? '' : data[0].qtd3?.toString().padStart(2, '0')}</p>
							<p>{data[0].qtd4 === '' ? '' : data[0].qtd4?.toString().padStart(2, '0')}</p>
							<p>{data[0].qtd5 === '' ? '' : data[0].qtd5?.toString().padStart(2, '0')}</p>
							<p>{data[0].qtd6 === '' ? '' : data[0].qtd6?.toString().padStart(2, '0')}</p>
						</div> */}
					</div>
					<p id='diariaAut'></p>
					<p id='leito'></p>
					<p id='cnpj3'></p>
					<p id='contratado3'></p>
					<p id='dataSol'>{data.dateSol?.split('-').reverse().join('/')}</p>
					<div id='logoImage'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={data.src} alt='' className='h-full object-contain' />
					</div>
					<textarea id='obs' defaultValue={data.obs} disabled></textarea>
				</div>
			</div>
		</>
	);
};

export default GuiaInt;
