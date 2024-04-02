import { action, makeAutoObservable } from "mobx";
import axios from "axios";

class ProductStore {
  data = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async addCommentToProduct(productId, commentData) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/products/${productId}/comments`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to add comment to product");
      }

      const productIndex = this.data.findIndex(
        (product) => product.id === productId,
      );
      if (productIndex !== -1) {
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
      this.data = response.data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }
}

const productStore = new ProductStore();
export default productStore;
