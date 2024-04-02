import Cover from '../../assets/cover-img.jpg';
import productStore from '../../store/productStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cls from './Products.module.scss';

const Products = () => {
	useEffect(() => {
		productStore.fetchData();
	}, []);

	return (
		<div className={cls.products}>
			{productStore.data.map((product) => (
				<div className={cls.product} key={product.id}>
					<div className={cls.text}>
						<h2>
							<Link to={`/${product.id}`}>{product.title}</Link>
						</h2>
						<p>Описание: {product.description}</p>
						<p>Цена: {product.price}</p>
						{product.comments?.length && (
							<p>Коментарии: {product.comments?.length}</p>
						)}
					</div>
					<Link to={`/${product.id}`}>
						<img
							className={cls.image}
							src={product.images?.find((img) => img.main)?.url || Cover}
							alt="product"
						/>
					</Link>
				</div>
			))}
		</div>
	);
};

export default observer(Products);
