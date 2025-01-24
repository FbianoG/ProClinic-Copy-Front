'use client';
import { useEffect } from 'react';
import PlansCard from './plansCard';
import usePlans from '@/hooks/usePlans';
import { usePlansContext } from '@/context/PlansContext';
import Loader from '@/components/shared/Loader';

/* eslint-disable react-hooks/exhaustive-deps */

const PlansList = () => {
	const { plans } = usePlansContext();

	const { loading, getPlans } = usePlans();

	useEffect(() => {
		if (!plans) getPlans();
	}, []);

	return (
		<ul className='flex w-full flex-wrap justify-evenly gap-4  md:gap-y-6 pb-4'>
			{plans && plans.length > 0 && !loading && plans.map((plan) => <PlansCard key={plan._id} plan={plan} />)}{' '}
			{plans && !loading && plans.length === 0 && <li className='p-2'>Nenhum plano cadastrado.</li>}
			{loading && <Loader text='Carregando Planos' />}
		</ul>
	);
};

export default PlansList;
