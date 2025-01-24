import WaitList from './WaitList';
import Header from '@/components/shared/Header';
import Calendar from './Calendar';

const Agenda = () => {
	return (
		<>
			<Header />
			<main>
				<section className=' h-[calc(100vh-4rem)] flex'>
					<WaitList />
					<Calendar />
				</section>
			</main>
		</>
	);
};

export default Agenda;
