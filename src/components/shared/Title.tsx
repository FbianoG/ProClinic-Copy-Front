interface Props{
	text: string;
}

const Title = ({ text }: Props) => {
	return (
		<h1 className='mb-4 text-2xl font-medium text-primary'>
			{text}
		</h1>
	);
};

export default Title;
