'use client';

import { Label, Pie, PieChart } from 'recharts';

import { CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { IEvent } from '@/interfaces/event';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
	events: IEvent[];
}

const ChartProced = ({ events }: Props) => {

	const [chartData, setChartData] = useState<{ type: string; count: number; fill: string }[]>();

	const [chartConfig, setChartConfig] = useState<any>();

	useEffect(() => {
		if (!events) return;

		const consultas = events.filter((event) => event.type === 'consulta' && event.status === 'atendido');
		const exames = events.filter((event) => event.type === 'exame' && event.status === 'atendido');
		const retornos = events.filter((event) => event.type === 'retorno' && event.status === 'atendido');
		const cirurgias = events.filter((event) => event.type === 'cirurgia' && event.status === 'atendido');

		setChartData([
			{ type: 'Consulta', count: consultas.length, fill: '#5d93b7' },
			{ type: 'Exame', count: exames.length, fill: '#d36cb5' },
			{ type: 'Retorno', count: retornos.length, fill: '#64bdac' },
			{ type: 'Cirurgia', count: cirurgias.length, fill: '#c35e5e' },
		]);

		setChartConfig({
			Consulta: {
				label: 'Consulta',
				color: 'hsl(var(--chart-1))',
			},
			Exame: {
				label: 'Exame',
				color: 'hsl(var(--chart-2))',
			},
			Retorno: {
				label: 'Retorno',
				color: 'hsl(var(--chart-3))',
			},
			Cirurgia: {
				label: 'Cirurgia',
				color: 'hsl(var(--chart-4))',
			},
		});
	}, [events]);

	const [totalProced, setTotalProced] = useState<any>();

	useEffect(() => {
		if (!chartConfig || !chartData) return;
		setTotalProced(chartData.reduce((acc, curr) => acc + curr.count, 0));
	}, [chartConfig]);

	return (
		<>
			{chartConfig && chartData && (
				<CardContent className='w-full rounded bg-card p-2 shadow md:w-[500px]'>
					<h3 className='text-lg font-semibold text-primary'>Atendimentos Por Procedimento</h3>
					<ChartContainer config={chartConfig} className='w-full'>
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie data={chartData} dataKey='count' nameKey='type' innerRadius={60} strokeWidth={5}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
													<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold '>
														{totalProced.toLocaleString()}
													</tspan>
													<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground '>
														Atendimentos
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>
			)}
		</>
	);
};

export default ChartProced;
