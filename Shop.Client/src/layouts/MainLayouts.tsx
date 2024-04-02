import Header from '../components/Header/Header';
import { FC } from 'react';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
