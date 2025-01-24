'use client';

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { IEvent } from '@/interfaces/event';

interface Props {
	events: IEvent[];
}

const chartConfig = {
	atend: {
		label: 'Atendimentos',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

const ChartAge = ({ events }: Props) => {
	const [chartData, setChartData] = useState<{ age: string; atend: number }[]>();

	useEffect(() => {
		if (!events) return;

		const eventComplete = events.filter((event) => event.status === 'atendido');

		const eventAge = eventComplete.map((event) => {
			const age = Math.floor((new Date().getTime() - new Date(event.patientNasc).getTime()) / (1000 * 60 * 60 * 24 * 365));
			return { age };
		});

		const result = eventAge.reduce(
			(acc: { [key: number]: number }, curr) => {
				acc[curr.age] = (acc[curr.age] || 0) + 1;
				return acc;
			},
			{} as { [key: number]: number },
		);

		setChartData(
			Object.entries(result).map(([key, value]) => {
				return { age: key as string, atend: value as number };
			}),
		);
	}, [events]);

	return (
		<Card className='w-full overflow-hidden rounded border-none p-2'>
			<h3 className='text-lg font-semibold text-primary'>Atendimentos Por Idade</h3>
			<CardContent>
				<ChartContainer config={chartConfig} className='h-52 w-full'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='age' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
						<Line
							dataKey='atend'
							type='natural'
							stroke='var(--color-atend)'
							strokeWidth={2}
							dot={{
								fill: 'var(--color-atend)',
							}}
							activeDot={{
								r: 6,
							}}>
							<LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ChartAge;
