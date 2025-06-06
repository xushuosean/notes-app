import { getNotes } from '@/services/home/api';
import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import moment from 'moment';
import { v4 } from 'uuid';

export type NoteData = {
  id: string;
  name: string;
  content: string;
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
      properties: ['notes', 'isSync'],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        // persist 完成的回调，在这里可以执行一些拿到数据后需要执行的操作，如果在页面上要判断是否完成persist，使用 isHydrated
        console.log(persistStore, 'persistStore', this.isSync);
      }),
    );
  }

  init() {
    if (!this.isSync) {
      this.getNotes();
    }
  }

  async getNotes() {
    try {
      const data = await getNotes();
      if (data) {
        this.notes = data;
        this.isSync = true;
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

    targetNote.content = content;

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
      name: '',
      content: '',
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

  activeNoteId: string = '';

  isSync: boolean = false;
}
