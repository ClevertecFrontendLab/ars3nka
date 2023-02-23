import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'https://strapi.cleverland.by';

export const dataApi = createApi({
  reducerPath: 'api/products',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://strapi.cleverland.by/api/' }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => 'categories',
    }),
    getBooks: build.query({
      query: () => 'books',
    }),
    getBookById: build.query({
      query: (id) => `books/${id}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetBooksQuery, useGetBooksQuerySubscription, useGetBookByIdQuery } = dataApi;
