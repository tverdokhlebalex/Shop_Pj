import Cover from "../../assets/cover-img.jpg";
import productStore from "../../store/productStore";
import CommentForm from "../CommentForm/CommentForm";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cls from "./Product.module.scss";

const Product: FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = productStore.data.find((product) => product.id === id);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.thumbnail?.url,
  );

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCommentAdded = (commentData) => {
    if (product) {
      product.comments.push(commentData);
    }
  };

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className={cls.product}>
      <div className={cls.card}>
        <div className={cls.text}>
          <h2>{product.title}</h2>
          <p>Описание: {product.description}</p>
          <p>Цена: {product.price}</p>
          {product.comments?.length && (
            <p>Коментарии: {product.comments.length}</p>
          )}
          {product.comments?.length && (
            <div className={cls.comments}>
              <h3>Комментарии:</h3>
              <ul className={cls.commentsInner}>
                {product.comments.map((comment) => (
                  <li key={comment.id}>
                    <h4>{comment.name}</h4>
                    <p>E-mail: {comment.email}</p>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3>Добавить комментарий:</h3>
            <CommentForm productId={id} onCommentAdded={handleCommentAdded} />
          </div>
        </div>
        <img className={cls.image} src={selectedImage || Cover} alt="product" />
        {product.images && (
          <div className={cls.otherImages}>
            {product.images.map((image) => (
              <img
                key={image.id}
                className={cls.otherImage}
                src={image.url}
                alt="product"
                onClick={() => handleImageClick(image.url)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={cls.similarProducts}>
        <h3>Похожие товары:</h3>
        <ul className={cls.similarUl}>
          {productStore.data
            .filter((p) => p.id !== id)
            .map((similarProduct) => (
              <li className={cls.similarLi} key={similarProduct.id}>
                <Link to={`/${similarProduct.id}`}>
                  {similarProduct.title} - {similarProduct.price} руб.
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
