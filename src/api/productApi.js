import axiosClient from "./axiosClient";

const productApi = {
  async getAll(params) {
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);

   // delete _page
   delete newParams._page

   // Fetch product list + count product
   const productList = await axiosClient.get('/products', { params: newParams})
   const count = await axiosClient.get('/products/count', { params: newParams})


   // Build response and return
   return {
      data: productList,
      pagination : {
         page: params._page,
         limit: params._limit,
         total: count
      }
   }
  },
  get(id) {
        const url = `products/${id}`
        return axiosClient.get(url)
    },
};

export default productApi;
