import api from "./api";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const getAdminProducts = async () => {
  const { data } = await api.get("/products/admin");
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};