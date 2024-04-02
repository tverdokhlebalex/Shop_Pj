import productStore from "../../store/productStore";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../shared/Button/Button";
import cls from "./CommentForm.module.scss";

interface CommentFormProps {
  productId: string;
  onCommentAdded: (commentData: CommentData) => void;
}

interface CommentData {
  name: string;
  email: string;
  body: string;
}

const CommentForm = ({ productId, onCommentAdded }: CommentFormProps) => {
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await productStore.addCommentToProduct(productId, commentData);
      setCommentData({
        name: "",
        email: "",
        body: "",
      });

      onCommentAdded(commentData);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form className={cls.form} onSubmit={handleCommentSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={commentData.name}
        onChange={handleInputChange}
        name="name"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={commentData.email}
        onChange={handleInputChange}
      />
      <textarea
        name="body"
        placeholder="Текст комментария"
        value={commentData.body}
        onChange={handleInputChange}
      />
      <Button appButton type="submit">
        Сохранить
      </Button>
    </form>
  );
};

export default observer(CommentForm);
