import { Button } from "../../shared/Button/Button";
import cls from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const handleClick = () => {};
  return (
    <div className={cls.home}>
      <p>
        В базе данных находится n товаров общей стоимостью m», где «n» — общее
        количество товаров в базе, а «m» – их суммарная стоимость.
      </p>
      <Button appButton onClick={handleClick}>
        <Link to="/products-list">Перейти к списку товаров</Link>
      </Button>
      <Button appButton onClick={handleClick}>
        <Link to="/admin">Перейти в систему администрирования</Link>
      </Button>
    </div>
  );
};

export default Home;
