import { action, makeAutoObservable } from "mobx";
import axios from "axios";

interface Comment {
  userId: string;
  text: string;
}

interface Product {
  id: string | number;
  comments: Comment[];
}

class ProductStore {
  data: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async addCommentToProduct(productId: string | number, commentData: Comment) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/products/${productId}/comments`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to add comment to product");
      }

      const productIndex = this.data.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        // Проверяем, существует ли массив комментариев, если нет — инициализируем его
        if (!this.data[productIndex].comments) {
          this.data[productIndex].comments = [];
        }
        this.data[productIndex].comments.push(commentData);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  @action.bound async fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      if (response.status === 200 && Array.isArray(response.data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.data = response.data.map((product: any) => ({
          ...product,
          comments: product.comments || [],
        }));
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }
}

const productStore = new ProductStore();
export default productStore;
