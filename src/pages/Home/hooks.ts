import { createContext, useContext } from 'react';
import { NotesDataModel } from './NotesDataModel';

export const DataModelContext = createContext<{ value: NotesDataModel | null }>(
  { value: null },
);

export const DataModelProvider = DataModelContext.Provider;

export const useDataModel = () => {
  const { value } = useContext(DataModelContext);
  return value;
};
