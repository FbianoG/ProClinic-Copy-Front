'use client';
import { getClinicApi } from '@/api/clinicApi';
import { useClinicContext } from '@/context/ClinicContext';
import { Toast } from '@/utils/Toast';
import useUser from './useUser';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useClinic = () => {
	const { setClinic } = useClinicContext();

	const { verifyUser } = useUser();
	
	const getClinic = async () => {
		try {
			const currentUser = verifyUser();
			const res = await getClinicApi(currentUser);
			setClinic(res);
		} catch (error: any) {
			Toast('Erro', error.message, '⛔');
		}
	};

	return { getClinic };
};

export default useClinic;
