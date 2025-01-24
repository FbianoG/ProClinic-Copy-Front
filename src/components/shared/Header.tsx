'use client';
import Link from 'next/link';
import { CalendarDaysIcon, ChartColumn, CircleUser, FileText, History, LucideBookHeart, Menu, Moon, Sun, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';

const Header = () => {
	const { user } = useUserContext();

	const [theme, setTheme] = useState<string>('');

	const [pageActive, setpageActive] = useState<string>('');

	useEffect(() => {
		const the = localStorage.getItem('Theme');
		if (the === 'dark') darkTheme();
		else lightTheme();
		setpageActive(window.location.pathname);
	}, []);

	useEffect(() => {
		if (!pageActive || !user) return;
		if (pageActive === '/dashboard' && user.role === 'recep') {
			window.location.href = '/agenda';
		}
	}, [pageActive, user]);

	const lightTheme = () => {
		setTheme('');
		localStorage.removeItem('Theme');
		document.documentElement.classList.remove('dark');
	};

	const darkTheme = () => {
		setTheme('dark');
		localStorage.setItem('Theme', 'dark');
		document.documentElement.classList.add('dark');
	};

	return (
		<header className='sticky top-0 z-50 flex h-16 items-center justify-end gap-4 overflow-hidden border-b bg-card px-4 md:px-8 lg:px-16'>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-4 md:text-sm lg:gap-6'>
				<Link href='#' className='mr-4 flex items-start gap-1 text-lg font-semibold md:text-base'>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_1607_9770)'>
							<path
								d='M7.6 2.5V7.5C7.6 7.55523 7.55523 7.6 7.5 7.6H2.5C1.67157 7.6 0.999998 8.27157 1 9.1L1.00001 14.9C1.00001 15.7284 1.67158 16.4 2.50001 16.4H7.50001C7.55524 16.4 7.60001 16.4448 7.60001 16.5L7.6 21.5C7.6 22.3284 8.27157 23 9.1 23H14.9054C15.7338 23 16.4054 22.3284 16.4054 21.5L16.4054 16.4994C16.4054 16.4444 16.4498 16.3997 16.5048 16.3994L21.5092 16.3686C22.334 16.3636 23 15.6935 23 14.8687L23 9.06873C23 8.2367 22.3228 7.56364 21.4908 7.56876L16.506 7.59938C16.4505 7.59972 16.4054 7.55485 16.4054 7.49938V2.5C16.4054 1.67157 15.7338 1 14.9054 1H9.1C8.27157 1 7.6 1.67157 7.6 2.5Z'
								stroke='#3498db'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</g>
						<defs>
							<clipPath id='clip0_1607_9770'>
								<rect width='24' height='24' fill='white' />
							</clipPath>
						</defs>
					</svg>

					<div className='flex flex-col gap-0 leading-4'>
						<span className='text-[#555] dark:text-[#aaa]'>PROCLINIC</span>
						<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa] dark:text-[#555]'>
							<span>Medical Record</span>
						</div>
					</div>
				</Link>

				<Link
					href='/dashboard'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={{
						...(pageActive === '/dashboard' ? { color: '#3498db' } : {}),
						...(user?.role === 'recep' ? { display: 'none' } : {}),
					}}>
					<ChartColumn size={15} />
					Dashboard
				</Link>

				<Link
					href='/agenda'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={pageActive === '/agenda' ? { color: '#3498db' } : {}}>
					<CalendarDaysIcon size={15} />
					Agenda
				</Link>

				<Link
					href='/historic'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={pageActive === '/historic' ? { color: '#3498db' } : {}}>
					<History size={15} />
					Histórico
				</Link>

				<Link
					href='/patients'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={pageActive === '/patients' ? { color: '#3498db' } : {}}>
					<User2 size={15} />
					Pacientes
				</Link>

				<Link
					href='/plans'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={pageActive === '/plans' ? { color: '#3498db' } : {}}>
					<LucideBookHeart size={15} />
					Planos
				</Link>

				<Link
					href='/documents'
					className='peer:hover:opacity-50 flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-foreground'
					style={pageActive === '/documents' ? { color: '#3498db' } : {}}>
					<FileText size={15} />
					Documentos
				</Link>
			</nav>

			<Link href='#' className='mr-auto flex items-start gap-1 text-lg font-semibold md:hidden'>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g clipPath='url(#clip0_1607_9770)'>
						<path
							d='M7.6 2.5V7.5C7.6 7.55523 7.55523 7.6 7.5 7.6H2.5C1.67157 7.6 0.999998 8.27157 1 9.1L1.00001 14.9C1.00001 15.7284 1.67158 16.4 2.50001 16.4H7.50001C7.55524 16.4 7.60001 16.4448 7.60001 16.5L7.6 21.5C7.6 22.3284 8.27157 23 9.1 23H14.9054C15.7338 23 16.4054 22.3284 16.4054 21.5L16.4054 16.4994C16.4054 16.4444 16.4498 16.3997 16.5048 16.3994L21.5092 16.3686C22.334 16.3636 23 15.6935 23 14.8687L23 9.06873C23 8.2367 22.3228 7.56364 21.4908 7.56876L16.506 7.59938C16.4505 7.59972 16.4054 7.55485 16.4054 7.49938V2.5C16.4054 1.67157 15.7338 1 14.9054 1H9.1C8.27157 1 7.6 1.67157 7.6 2.5Z'
							stroke='#3498db'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</g>
					<defs>
						<clipPath id='clip0_1607_9770'>
							<rect width='24' height='24' fill='white' />
						</clipPath>
					</defs>
				</svg>
				<div className='flex flex-col gap-0 leading-4'>
					<span className='text-[#555] dark:text-[#aaa]'>PROCLINIC</span>
					<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa] dark:text-[#555]'>
						<span>Medical Record</span>
					</div>
				</div>
			</Link>

			<div className='flex w-max items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='secondary' size='icon' className='rounded-full'>
							<CircleUser className='h-5 w-5' />
							<span className='sr-only'>Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='bg-card shadow-xl'>
						<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{user && <p className='p-2 font-semibold capitalize text-primary'>{user.name}</p>}
						<DropdownMenuItem>
							<Link href='/config'>Configurações</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/reports'>Relatórios</Link>
						</DropdownMenuItem>
						{theme === 'dark' && (
							<DropdownMenuItem className='flex gap-2' onClick={lightTheme}>
								Tema Claro <Sun size={15} />
							</DropdownMenuItem>
						)}
						{theme !== 'dark' && (
							<DropdownMenuItem className='flex gap-2' onClick={darkTheme}>
								Tema Escuro <Moon size={15} />
							</DropdownMenuItem>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								localStorage.clear();
								location.href = '/';
							}}
							className='text-destructive'>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='right'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link href='#' className='flex items-start gap-1 text-lg font-semibold md:text-base'>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clipPath='url(#clip0_1607_9770)'>
									<path
										d='M7.6 2.5V7.5C7.6 7.55523 7.55523 7.6 7.5 7.6H2.5C1.67157 7.6 0.999998 8.27157 1 9.1L1.00001 14.9C1.00001 15.7284 1.67158 16.4 2.50001 16.4H7.50001C7.55524 16.4 7.60001 16.4448 7.60001 16.5L7.6 21.5C7.6 22.3284 8.27157 23 9.1 23H14.9054C15.7338 23 16.4054 22.3284 16.4054 21.5L16.4054 16.4994C16.4054 16.4444 16.4498 16.3997 16.5048 16.3994L21.5092 16.3686C22.334 16.3636 23 15.6935 23 14.8687L23 9.06873C23 8.2367 22.3228 7.56364 21.4908 7.56876L16.506 7.59938C16.4505 7.59972 16.4054 7.55485 16.4054 7.49938V2.5C16.4054 1.67157 15.7338 1 14.9054 1H9.1C8.27157 1 7.6 1.67157 7.6 2.5Z'
										stroke='#3498db'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</g>
								<defs>
									<clipPath id='clip0_1607_9770'>
										<rect width='24' height='24' fill='white' />
									</clipPath>
								</defs>
							</svg>
							<div className='flex flex-col gap-0 leading-4'>
								<span className='text-[#555] dark:text-[#aaa]'>PROCLINIC</span>
								<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa] dark:text-[#555]'>
									<span>Medical Record</span>
								</div>
							</div>
						</Link>
						<Link
							href='/dashboard'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={{
								...(pageActive === '/dashboard' ? { color: '#3498db' } : {}),
								...(user?.role === 'recep' ? { display: 'none' } : {}),
							}}>
							<ChartColumn size={15} />
							Dashboard
						</Link>
						<Link
							href='/agenda'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={pageActive === '/agenda' ? { color: '#3498db' } : {}}>
							<CalendarDaysIcon size={15} />
							Agenda
						</Link>

						<Link
							href='/historic'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={pageActive === '/historic' ? { color: '#3498db' } : {}}>
							<History size={15} />
							Histórico
						</Link>

						<Link
							href='/patients'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={pageActive === '/patients' ? { color: '#3498db' } : {}}>
							<User2 size={15} />
							Pacientes
						</Link>

						<Link
							href='/plans'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={pageActive === '/plans' ? { color: '#3498db' } : {}}>
							<LucideBookHeart size={15} />
							Planos
						</Link>

						<Link
							href='/documents'
							className='peer:hover:opacity-50 flex items-center gap-2 rounded text-muted-foreground transition-colors hover:text-foreground'
							style={pageActive === '/documents' ? { color: '#3498db' } : {}}>
							<FileText size={15} />
							Documentos
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default Header;
