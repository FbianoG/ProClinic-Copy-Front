import { useDoctorContext } from '@/context/DoctorContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from 'recharts';

interface Props {
	setSelectedDoctor: (value: string) => void;
	selectedDoctor: string;
}

const SelectDoctor = ({ setSelectedDoctor, selectedDoctor }: Props) => {
	const { doctors } = useDoctorContext();
	return (
		<div className='mb-4 grid gap-1'>
			<Label className='text-lg font-semibold'>Filtrar por Médico</Label>

			<Select defaultValue={selectedDoctor} onValueChange={(value) => setSelectedDoctor(value)}>
				<SelectTrigger id='plan' className='focus:ring-none w-full rounded border-none bg-card capitalize shadow md:w-60'>
					<SelectValue />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						<SelectItem value='todos' className='capitalize'>
							todos
						</SelectItem>

						{doctors?.map((e) => (
							<SelectItem key={e._id} value={e._id} className='capitalize'>
								{e.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectDoctor;
