import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Toast = (title: string, description: string, icon: any) => {
	if (title === 'Erro') new Audio('/audio/alert.mp3').play();
	toast(title, {
		description: description,
		duration: 4500,
		icon: icon,
	});
};
