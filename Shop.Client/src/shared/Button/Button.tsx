import { cn } from '../lib/classNames/cn';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
	appButton?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	Button.displayName = 'Button';

	const { className, children, appButton, ...otherProps } = props;

	return (
		<button
			className={cn(cls.Button, [className, appButton ? cls.appButton : ''])}
			{...otherProps}
		>
			{children}
		</button>
	);
});
