import { request } from '@umijs/max';

export const login = async () => {
  return await request('/api/auth/login', {
    method: 'post',
  });
};

export const syncData = async (notes: any, categories: any) => {
  return await request('/api/sync', {
    method: 'post',
    data: {
      notes,
      categories,
    },
  });
};

export const getNotes = async () => {
  return await request('/api/sync/notes', {
    method: 'post',
  });
};

export const getCategories = async () => {
  return await request('/api/sync/categories', {
    method: 'post',
  });
};
