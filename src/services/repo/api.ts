import { request } from '@umijs/max';

export type RepoType = {
  id: number;
  name: string;
  fullName: string;
  desc: string;
};

export type RepoDetailType = {
  name: string;
  path: string;
  type: 'dir' | 'file';
  repo: string;
};

export const getRepos = async (data: { pageNum: number; pageSize: number }) => {
  return await request<Promise<RepoType[]>>('/api/sync/get/repos', {
    method: 'get',
    params: data,
  });
};

export const getRepoDetail = async (data: { repo: string; path: string }) => {
  return await request('/api/sync/get/repo/detail', {
    method: 'get',
    params: data,
  });
};

export const saveDataRepo = async (data: { dataPath: string }) => {
  console.log(data, 'ddddd');
  return await request('/api/sync/save/path', {
    method: 'post',
    data: data,
  });
};
