import { IUser } from '@/interfaces/user';

export const setDoctor = (doctorId: string, doctors: IUser[]) => {
    const res = doctors.find((doctor) => doctorId === doctor._id);
    return res
};
