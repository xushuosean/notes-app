import {
  getRepoDetail,
  getRepos,
  RepoDetailType,
  saveDataRepo,
} from '@/services/repo/api';
import { DataNode } from 'antd/es/tree';
import { makeAutoObservable } from 'mobx';

const parseFold = (details: RepoDetailType[]): DataNode[] => {
  return details.map((item) => ({
    key: item.name,
    title: item.name,
    path: item.path,
    isLeaf: item.type === 'file',
    repo: item.repo,
  }));
};

export default class RepoDataModel {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    try {
      this.loading = true;
      this.paths = [];
      const data = await this.getRepos();
      this.treeData = data.map((item) => ({
        key: item.id,
        id: item.id,
        title: item.fullName,
        isLeaf: false,
        repo: item.name,
        path: '',
      }));
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  async getRepos() {
    try {
      return await getRepos({ pageNum: 1, pageSize: 10 });
    } catch (err) {
      console.log('get repos error: ', err);
      return [];
    }
  }

  async loadData(data: { repo: string; path: string }) {
    this.loading = true;
    try {
      const detail = await getRepoDetail({ repo: data.repo, path: data.path });
      const content = parseFold(detail);
      this.treeData = content;

      this.paths = [data.repo];
      if (data.path) {
        this.paths.splice(this.paths.length, 0, ...data.path.split('/'));
      }
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  savePath() {
    saveDataRepo({ dataPath: this.paths.join('/') });
  }

  treeData: DataNode[] = [];
  paths: string[] = [];
  loading: boolean = false;
  currentRepo: string = '';
}
