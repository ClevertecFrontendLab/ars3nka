import axios from 'axios';

export const service = axios.create({
  baseURL: 'https://strapi.cleverland.by',
});
