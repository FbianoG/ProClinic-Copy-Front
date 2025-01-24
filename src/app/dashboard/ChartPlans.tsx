'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { usePlansContext } from '@/context/PlansContext';
import React from 'react';
import { IEvent } from '@/interfaces/event';

interface Result {
	plan: string;
	count: number;
	fill: string | undefined;
}

interface Props {
	events: IEvent[];
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

const ChartPlans = ({ events }: Props) => {
	const { plans } = usePlansContext();

	const [chartData, setChartData] = useState<Result[]>();

	const [chartConfig, setChartConfig] = useState<any>();

	useEffect(() => {
		if (!events || !plans) return;

		const eventsAtend = events.filter((event) => event.status === 'atendimento' || event.status === 'atendido');

		const PlansAverage = eventsAtend.reduce((acc: any, event: any) => {
			acc[event.plan] = (acc[event.plan] || 0) + 1;
			return acc;
		}, {});

		const updatedPlansAverage = Object.keys(PlansAverage).reduce((acc: any, key: any) => {
			const planDetail = plans.find((plan) => plan._id === key);
			if (planDetail) {
				acc[planDetail.name] = PlansAverage[key];
			}
			return acc;
		}, {});

		const result = Object.entries(updatedPlansAverage)
			.map(([key, value], index) => ({
				plan: key as string,
				count: value as number,
				fill: ['#2563eb', '#8ca1bb', '#60a5fa', '#60a5fa'][index] || '#60a5fa',
			}))
			.sort((a, b) => b.count - a.count);

		let countar = 0;

		result.forEach((element: Result, index: number) => {
			if (index < 3) return;
			countar += element.count;
		});

		setChartData([...result.filter((_element, index) => index < 3), { plan: 'Outros', count: countar, fill: '#e8c468' }]);
	}, [events, plans]);

	useEffect(() => {
		if (!chartData) return;

		const c = {
			count: {
				label: 'Atendidos',
			},
			[chartData[0]?.plan]: {
				label: chartData[0]?.plan,
			},
			[chartData[1]?.plan]: {
				label: chartData[1]?.plan,
			},
			[chartData[2]?.plan]: {
				label: chartData[2]?.plan,
			},
			[chartData[3]?.plan]: {
				label: chartData[3]?.plan,
			},
		};
		setChartConfig(c);
	}, [chartData]);

	return (
		<div className='w-full  rounded bg-card p-2 shadow md:w-[500px]'>
			<h3 className='text-lg font-semibold text-primary'>Planos Mais Atendidos</h3>
			{chartConfig && chartData && (
				<ChartContainer config={chartConfig} className=' w-full px-4'>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						margin={{
							left: 0,
						}}>
						<YAxis
							dataKey='plan'
							type='category'
							tickLine={true}
							tickMargin={5}
							axisLine={false}
							tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
						/>
						<XAxis dataKey='count' type='number' hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey='count' layout='vertical' radius={5} />
					</BarChart>
				</ChartContainer>
			)}
		</div>
	);
};

export default ChartPlans;
