import { getCategories, getNotes } from '@/services/home/api';
import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import moment from 'moment';
import { v4 } from 'uuid';

export type NoteData = {
  id: string;
  text: string;
  category: '';
  favorite: boolean;
  created: string;
  lastUpdated: string;
};

export type Category = any;

export class NotesDataModel {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'notesData',
      properties: ['notes'],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        // persist 完成的回调，在这里可以执行一些拿到数据后需要执行的操作，如果在页面上要判断是否完成persist，使用 isHydrated
        console.log(persistStore, 'persistStore');
      }),
    );
  }

  init() {
    this.getNotes();
    this.getCategories();
  }

  async getNotes() {
    try {
      const data = await getNotes();
      if (data) {
        this.notes = data;
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  async getCategories() {
    try {
      const data = await getCategories();
      if (data) {
        this.categories = data;
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  setActiveNoteId(id: string) {
    this.activeNoteId = id;
  }

  get ActiveNote() {
    return this.notes.find((item) => item.id === this.activeNoteId) ?? null;
  }

  updateContentById(id: string, content: string) {
    const targetNote = this.notes.find((note) => note.id === id);
    if (!targetNote) return;

    targetNote.text = content;

    this.updateLastUpdateTimeById(id);
  }

  updateLastUpdateTimeById(id: string) {
    const targetNote = this.notes.find((note) => note.id === id);
    if (!targetNote) return;

    targetNote.lastUpdated = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  addNotes() {
    const newNote: NoteData = {
      id: v4(),
      text: '',
      category: '',
      favorite: false,
      created: moment().format('YYYY-MM-DD HH:mm:ss'),
      lastUpdated: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    this.notes.push(newNote);
  }

  deleteNotes(id: string) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  notes: NoteData[] = [];
  categories: Category[] = [];

  activeNoteId: string = '';
}
