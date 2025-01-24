'use client';
import Link from 'next/link';
import { Menu, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const HeaderHome = () => {
	return (
		<header className='sticky top-0 z-50 flex h-16 items-center justify-end gap-4 border-b bg-card px-[5%]'>
			<Link href='#' className='mr-auto flex items-start gap-1 text-lg font-semibold md:text-base'>
				<PlusCircle size={23} className='text-[#3498db]' />
				<div className='flex flex-col gap-0 leading-4'>
					<span className='text-[#555]'>PROCLINIC</span>
					<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa]'>
						<span>Medical Record</span>
					</div>
				</div>
			</Link>
			<nav className='hidden flex-col gap-6 text-xl font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<Link href='/dashboard' className='peer:hover:opacity-50 text-muted-foreground transition-colors hover:text-foreground'>
					Início
				</Link>
				<Link href='/agenda' className='peer:hover:opacity-50 text-muted-foreground transition-colors hover:text-foreground'>
					Sobre
				</Link>
				<Link href='/patients' className='peer:hover:opacity-50 text-muted-foreground transition-colors hover:text-foreground'>
					Preço
				</Link>
				<Link href='/plans' className='peer:hover:opacity-50 text-muted-foreground transition-colors hover:text-foreground'>
					Contato
				</Link>
			</nav>

			<Link href='#' className='mr-auto flex items-start gap-1 text-lg font-semibold md:hidden'>
				<PlusCircle size={23} className='text-[#3498db]' />
				<div className='flex flex-col gap-0 leading-4'>
					<span className='text-[#555]'>PROCLINIC</span>
					<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa]'>
						<span>Medical Record</span>
					</div>
				</div>
			</Link>

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
							<PlusCircle size={23} className='text-[#3498db]' />
							<div className='flex flex-col gap-0 leading-4'>
								<span className='text-[#555]'>PROCLINIC</span>
								<div className='flex flex-col gap-0 text-xs leading-3 text-[#aaa]'>
									<span>Medical Record</span>
								</div>
							</div>
						</Link>
						<Link href='/dashboard' className='text-muted-foreground transition-colors hover:text-foreground'>
							Dashboard
						</Link>
						<Link href='/agenda' className='text-muted-foreground transition-colors hover:text-foreground'>
							Agenda
						</Link>
						<Link href='/patients' className='text-muted-foreground transition-colors hover:text-foreground'>
							Pacientes
						</Link>
						<Link href='/plans' className='text-muted-foreground transition-colors hover:text-foreground'>
							Planos
						</Link>
						<Link href='/plans' className='text-muted-foreground transition-colors hover:text-foreground'>
							Documentos
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default HeaderHome;
