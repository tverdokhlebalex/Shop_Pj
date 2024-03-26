import axios from "axios";
import {IProduct, IProductSearchFilter, type IProductEditData} from "@Shared/types";

const host = `http://${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}/${process.env.API_PATH}`;

export async function getProducts() {
    const {data} = await axios.get <IProduct[]>(`${host}/products`);
    return data || [];
}

export async function searchProducts(
    filter: IProductSearchFilter
): Promise<IProduct[]> {
    const { data } = await axios.get < IProduct[] > (
        `${host}/products/search`,
        { params: filter }
    );
    return data || [];
}

export async function getProduct(
    id: string
): Promise<IProduct | null> {
    try {
        const { data } = await axios.get < IProduct > (
            `${host}/products/${id}`
        );
        return data;
    } catch (e) {
        return null;
    }
}

export async function removeProduct(id: string): Promise<void> {
    await axios.delete(`${host}/products/${id}`);
  }
  
  export async function removeComment(id: string): Promise<void> {
    await axios.delete(`${host}/comments/${id}`);
  }
  
  function compileIdsToRemove(data: string | string[]): string[] {
    if (typeof data === 'string') return [data];
    return data;
  }
  
  function splitNewImages(str = ''): string[] {
    return str
      .split(/\r\n|,/g)
      .map((url) => url.trim())
      .filter((url) => url);
  }
  
  export async function updateProduct(
    productId: string,
    formData: IProductEditData
  ): Promise<void> {
    try {
      // запрашиваем у Products API товар до всех изменений
      const { data: currentProduct } = await axios.get<IProduct>(
        `${host}/products/${productId}`
      );
  
      if (formData.commentsToRemove) {
        const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);
        const getDeleteCommentActions = () =>
          commentsIdsToRemove.map((commentId) => {
            return axios.delete(`${host}/comments/${commentId}`);
          });
        await Promise.all(getDeleteCommentActions());
      }
  
      if (formData.imagesToRemove) {
        const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
        await axios.post(`${host}/products/remove-images`, imagesIdsToRemove);
      }
  
      if (formData.similarProductsToRemove) {
        const similarProductsIdsToRemove = compileIdsToRemove(
          formData.similarProductsToRemove
        );
        await axios.delete(`${host}/similar-products/${productId}`, {
          data: similarProductsIdsToRemove,
        });
      }
  
      if (formData.productsToAddSimilar) {
        const similarProductsToAdd = compileIdsToRemove(
          formData.productsToAddSimilar
        );
        await axios.post(
          `${host}/similar-products`,
          similarProductsToAdd.map((id) => [productId, id])
        );
      }
  
      if (formData.newImages) {
        const urls = splitNewImages(formData.newImages);
        const images = urls.map((url) => ({ url, main: 0 }));
        if (!currentProduct.thumbnail) {
          images[0].main = 1;
        }
        await axios.post(`${host}/products/add-images`, {
          productId,
          images,
        });
      }
  
      if (
        formData.mainImage &&
        formData.mainImage !== currentProduct?.thumbnail
      ) {
        await axios.post(`${host}/products/update-thumbnail/${productId}`, {
          newThumbnailId: formData.mainImage,
        });
      }
  
      await axios.patch(`${host}/products/${productId}`, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
      });
    } catch (e) {
      console.log(e); // фиксируем ошибки, которые могли возникнуть в процессе
    }
  }
  