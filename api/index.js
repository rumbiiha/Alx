import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const customMiddleware = (api) => (next) => async (action) => {

  // console.log('===========', action.type);

  if (action.type.endsWith('rejected')) {
    const errorMessage = action.error.message;
    console.log(errorMessage);
  }
  console.log('===========',action.meta?.baseQueryMeta.response.headers.map, action.meta?.baseQueryMeta.response.headers.map.get('access_token'),);
  // if (action.type === api.util.actions.requestSuccess.type) {
  //   // Extract cookies from response headers
  //   const cookies = action.payload.response.headers.get('access_token')
  //   if (cookies) {
  //     // Save cookies to AsyncStorage
  //     console.log('===========', cookies);
  //     await AsyncStorage.setItem('access_token', cookies)
  //   }
  // }
  return next(action)
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://simple-maggot-expert.ngrok-free.app/api/v1/',
    prepareHeaders: async (headers, { getState }) => {
      // Retrieve cookies from AsyncStorage
      const storedCookies = await AsyncStorage.getItem('@user')
      if (storedCookies) {
        console.log('storedCookies.token', JSON.parse(storedCookies).token)
        headers.set('access_token', JSON.parse(storedCookies).token)
      }
      return headers
    },
  }),
  // enhanceMiddleware: customMiddleware,
  endpoints: (builder) => ({
    getProductFilters: builder.query({
      query: () => 'products/filters/all',
    }),
    getProductFeatures: builder.query({
      query: () => 'products/features/cars',
    }),
    getStoreDetails: builder.query({
      query: (params) => `shops/domain/${params}`,
    }),
    getProducts: builder.query({
      query: (params) => `products?${new URLSearchParams(params)}`,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
        // credentials: 'include',
      }),
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        // credentials: 'include',
      }),
    }),
    getViewedProducts: builder.query({
      query: () => ({ url: `/recently-viewed`, }),
    }),
    getRelatedProducts: builder.query({
      query: (productId) => `products/related/${productId}`,
    }),
    getDraftProduct: builder.query({
      query: () => `draft-ad`,
    }),
    getFlashSales: builder.query({
      query: () => `flash-Sales`,
    }),
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: 'files',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    deleteFile: builder.mutation({
      query: (fileId) => ({
        url: `files/${fileId}`,
        method: 'DELETE',
      }),
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
        // credentials: 'include',
      }),
    }),
    login: builder.mutation({
      query: ({ phoneNumber, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { phoneNumber, password },
      }),
    }),
    getAddress: builder.query({
      query: () => 'address',
    }),
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: 'address',
        method: 'POST',
        body: addressData,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `address/${addressId}`,
        method: 'DELETE',
      }),
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `address/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    makePayment: builder.mutation({
      query: (data) => ({
        url: '/payments/momo',
        method: 'POST',
        body: data,
      }),
    }),
    validatePhoneNumber: builder.query({
      query: (msisdn) => `/payments/validate/${msisdn}`,
    }),
    sendOtp: builder.mutation({
      query: (msisdn) => ({
        url: `/sms/otp/send/${msisdn}`,
        method: 'POST',
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/sms/otp/verify',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    getOrders: builder.query({
      query:() => `/orders/me`,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetProductFiltersQuery,
  useGetProductFeaturesQuery,
  useGetStoreDetailsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetViewedProductsQuery,
  useGetRelatedProductsQuery,
  useGetFlashSalesQuery,
  useGetCategoriesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
  useCreateProductMutation,
  useGetDraftProductQuery,
  useUpdateProductMutation,
  useLoginMutation,
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useMakePaymentMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
} = api
