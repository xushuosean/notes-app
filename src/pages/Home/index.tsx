import { login } from '@/services/home/api';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import SplitPane from 'react-split-pane';
import { NotesDataModel } from './NotesDataModel';
import { DataModelProvider, useDataModel } from './hooks';

const NoteLists = observer(() => {
  const model = useDataModel();
  if (!model) return <></>;

  return (
    <div>
      {model.notes.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              background: model.activeNoteId === item.id ? 'red' : '#fff',
            }}
          >
            <div>{item.id}</div>
            <div>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
});

const HomePage: React.FC = () => {
  const model = useMemo(() => {
    return new NotesDataModel();
  }, []);

  useEffect(() => {
    (async () => {
      await login();
      // await model.init();

      // console.log(model.notes);

      model.setActiveNoteId(model.notes?.[0]?.id);
    })();
  }, [model]);

  // const sync = () => {
  //   syncData([{ id: '123', value: 'any' }], [{ id: '345', value: '12sd' }]);
  // };

  return (
    <DataModelProvider value={{ value: model }}>
      <SplitPane split="vertical" minSize={200}>
        <div>123</div>
        <SplitPane split="vertical" minSize={200}>
          <div>
            <NoteLists />
          </div>
          <div>789</div>
        </SplitPane>
      </SplitPane>
    </DataModelProvider>
  );
};

export default observer(HomePage);
