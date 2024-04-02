import { Link } from 'react-router-dom';
import cls from './Header.module.scss';

const Header = () => {
	return (
		<header className={cls.header}>
			<h1>
				<Link to="/">Shop.Client</Link>
			</h1>
		</header>
	);
};

export default Header;
