'use client';
import { createPlanApi, editPlanApi, getPlansApi, editTussPlanApi } from '@/api/planApi';
import { usePlansContext } from '@/context/PlansContext';
import { IPlan } from '@/interfaces/iplan';
import { Toast } from '@/utils/Toast';
import { useState } from 'react';
import useUser from './useUser';

/* eslint-disable @typescript-eslint/no-explicit-any */

const usePlans = () => {
	const { verifyUser } = useUser();

	const [loading, setLoading] = useState<boolean>(false);

	const { plans, setPlans } = usePlansContext();

	const getPlans = async () => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await getPlansApi(currentUser);
			setPlans(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const createPlan = async (data: IPlan, setOpen: (value: boolean) => void, reset: () => void) => {
		try {
			setLoading(true);
			const currentUser = verifyUser();
			const res = await createPlanApi(data, currentUser);
			setPlans([...(plans as IPlan[]), res.create]);
			Toast('Sucesso', res.message, '✅');
			reset();
			setOpen(false);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const editPlan = async (data: IPlan, planId: string, setEditPlan: (value: 'proced' | null | 'plan') => void, reset: () => void) => {
		try {
			if (!plans) return;
			setLoading(true);
			const currentUser = verifyUser();
			data._id = planId;
			const res = await editPlanApi(data, currentUser);
			setPlans(plans.map((plan: IPlan) => (plan._id === planId ? res.update : plan)));
			setEditPlan(null);
			reset();
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			console.log(error);
			Toast('Error', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	const editTussPlan = async (plan: IPlan, procedimento: { codigo: string; procedimento: string; price: number }) => {
		try {
			if (!plans) return;
			setLoading(true);
			const currentUser = verifyUser();
			const data = {
				planId: plan._id,
				...procedimento,
			};
			const res = await editTussPlanApi(data, currentUser);
			Toast('Sucesso', res.message, '✅');
		} catch (error: any) {
			console.log(error);
			Toast('Error', error.message, '⛔');
		} finally {
			setLoading(false);
		}
	};

	return { getPlans, createPlan, loading, editPlan, editTussPlan };
};

export default usePlans;
