'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { IEvent } from '@/interfaces/event';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
	events: IEvent[];
}

const ChartStatus = ({ events }: Props) => {
	const [chartData, setChartData] = useState<any>([]);

	useEffect(() => {
		if (!events) return;
		const atendido = events.filter((event) => event.status === 'atendimento' || event.status === 'atendido');

		const falta = events.filter((event) => event.status === 'agendado' && new Date(event.start) < new Date());

		const agendado = events;

		const now = new Date();

		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() - now.getDay());
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		const semanaAutal = startOfWeek.toLocaleDateString().slice(0, 5) + '-' + endOfWeek.toLocaleDateString().slice(0, 5);

		// Semana passada
		const startOfLastWeek = new Date(startOfWeek);
		startOfLastWeek.setDate(startOfWeek.getDate() - 7);
		const endOfLastWeek = new Date(startOfLastWeek);
		endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
		const semanaPassada = startOfLastWeek.toLocaleDateString().slice(0, 5) + '-' + endOfLastWeek.toLocaleDateString().slice(0, 5);

		// Semana retrasada
		const startOfTwoWeeksAgo = new Date(startOfLastWeek);
		startOfTwoWeeksAgo.setDate(startOfLastWeek.getDate() - 7);
		const endOfTwoWeeksAgo = new Date(startOfTwoWeeksAgo);
		endOfTwoWeeksAgo.setDate(startOfTwoWeeksAgo.getDate() + 6);
		const semanaRetrasada = startOfTwoWeeksAgo.toLocaleDateString().slice(0, 5) + '-' + endOfTwoWeeksAgo.toLocaleDateString().slice(0, 5);

		// Semana retrasada passada
		const startOfThreeWeeksAgo = new Date(startOfTwoWeeksAgo);
		startOfThreeWeeksAgo.setDate(startOfTwoWeeksAgo.getDate() - 7);
		const endOfThreeWeeksAgo = new Date(startOfThreeWeeksAgo);
		endOfThreeWeeksAgo.setDate(startOfThreeWeeksAgo.getDate() + 6);
		const semanaRetrasadaPassada = startOfThreeWeeksAgo.toLocaleDateString().slice(0, 5) + '-' + endOfThreeWeeksAgo.toLocaleDateString().slice(0, 5);

		// Filtros
		const agendWeek = agendado.filter((event) => new Date(event.start) >= startOfWeek && new Date(event.start) <= endOfWeek);
		const atendtWeek = atendido.filter((event) => new Date(event.start) >= startOfWeek && new Date(event.start) <= endOfWeek);
		const faltWeek = falta.filter((event) => new Date(event.start) >= startOfWeek && new Date(event.start) <= endOfWeek);

		// semana passada --->
		const agendLastWeek = agendado.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfLastWeek && eventDate <= endOfLastWeek;
		});
		const atendLastWeek = atendido.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfLastWeek && eventDate <= endOfLastWeek;
		});
		const faltLastWeek = falta.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfLastWeek && eventDate <= endOfLastWeek;
		});

		// semana retrasada --->
		const agendTwoWeeksAgo = agendado.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfTwoWeeksAgo && eventDate <= endOfTwoWeeksAgo;
		});
		const atendTwoWeeksAgo = atendido.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfTwoWeeksAgo && eventDate <= endOfTwoWeeksAgo;
		});
		const faltTwoWeeksAgo = falta.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfTwoWeeksAgo && eventDate <= endOfTwoWeeksAgo;
		});

		// semana retrasada passada --->
		const agendThreeWeeksAgo = agendado.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfThreeWeeksAgo && eventDate <= endOfThreeWeeksAgo;
		});
		const atendThreeWeeksAgo = atendido.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfThreeWeeksAgo && eventDate <= endOfThreeWeeksAgo;
		});
		const faltThreeWeeksAgo = falta.filter((event) => {
			const eventDate = new Date(event.start);
			return eventDate >= startOfThreeWeeksAgo && eventDate <= endOfThreeWeeksAgo;
		});

		setChartData([
			{ semana: semanaRetrasadaPassada, agendados: agendThreeWeeksAgo.length, atendidos: atendThreeWeeksAgo.length, faltas: faltThreeWeeksAgo.length },
			{ semana: semanaRetrasada, agendados: agendTwoWeeksAgo.length, atendidos: atendTwoWeeksAgo.length, faltas: faltTwoWeeksAgo.length },
			{ semana: semanaPassada, agendados: agendLastWeek.length, atendidos: atendLastWeek.length, faltas: faltLastWeek.length },
			{ semana: semanaAutal, agendados: agendWeek.length, atendidos: atendtWeek.length, faltas: faltWeek.length },
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events]);

	const chartConfig = {
		agendados: {
			label: 'Agendados',
			color: '#2563eb',
		},
		atendidos: {
			label: 'Atendidos',
			color: '#60a5fa',
		},
		faltas: {
			label: 'Faltas',
			color: '#ef4444',
		},
	};

	return (
		<div className='w-full rounded bg-card p-2 shadow md:w-[500px]'>
			<h3 className='text-lg font-semibold text-primary'>Agendamentos - Atendidos - Faltas</h3>
			{chartData && (
				<ChartContainer config={chartConfig} className='w-full'>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='semana' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey='agendados' fill='var(--color-agendados)' radius={4} />
						<Bar dataKey='atendidos' fill='var(--color-atendidos)' radius={4} />
						<Bar dataKey='faltas' fill='var(--color-faltas)' radius={4} />
					</BarChart>
				</ChartContainer>
			)}
		</div>
	);
};

export default ChartStatus;
