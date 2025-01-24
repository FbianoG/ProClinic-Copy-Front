'use client';
import { getDoctorApi } from '@/api/userApi';
import useUser from './useUser';
import { useDoctorContext } from '@/context/DoctorContext';
import { Toast } from '@/utils/Toast';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useDoctor = () => {
	const { verifyUser } = useUser();

	const { setDoctors } = useDoctorContext();

	const getDoctors = async () => {
		try {
			const currentUser = verifyUser();
			const res = await getDoctorApi(currentUser);
			setDoctors(res);
		} catch (error: any) {
			console.log(error);
            Toast('Erro', error.message, '⛔');
		}
	};

	return { getDoctors };
};

export default useDoctor;
