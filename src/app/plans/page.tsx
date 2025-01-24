import ModalCreatePlan from './modalCreatePlan';
import PlansList from './plansList';
import Header from '@/components/shared/Header';

const Plans = () => {
	return (
		<>
			<Header />
			<div className='p-4 md:px-8 lg:px-16'>
				<div className='mb-8 flex flex-col items-center gap-2 gap-y-4 md:flex-row md:justify-between'>
					<h1 className='text-2xl font-medium text-primary'>Planos e Convênios</h1>
					<ModalCreatePlan />
				</div>
				<section>
					<PlansList />
				</section>
			</div>
		</>
	);
};

export default Plans;
