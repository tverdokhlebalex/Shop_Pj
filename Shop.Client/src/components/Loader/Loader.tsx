import loadingGif from "../../assets/gif/loader.gif";
import cls from "./Loader.module.scss";

const Loader = () => {
  return <img className={cls.loader} src={loadingGif} alt="Загрузка..." />;
};

export default Loader;
