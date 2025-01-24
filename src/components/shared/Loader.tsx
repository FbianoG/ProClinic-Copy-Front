// import { Loader2Icon } from 'lucide-react';
import './Loader.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	text: string;
}

const Loader = ({ text, ...rest }: Props) => {
	return (
		<div className='loading gap-2 flex flex-col items-center' {...rest}>
			<svg width='64px' height='48px'>
				<polyline points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24' id='back'></polyline>
				<polyline points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24' id='front'></polyline>
			</svg>
			<span className='animate-pulse '>{text}</span>
		</div>
	);
};

export default Loader;
