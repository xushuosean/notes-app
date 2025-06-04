import { login, syncData } from '@/services/home/api';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Detail } from './Detail';
import { DataModelProvider, useDataModel } from './hooks';
import { NoteData, NotesDataModel } from './NotesDataModel';

const NoteLists = observer(() => {
  const model = useDataModel();
  if (!model) return <></>;

  const handleSelect = useCallback(
    (item: NoteData) => {
      model.setActiveNoteId(item.id);
    },
    [model],
  );

  const items: MenuProps['items'] = [
    {
      label: '删除',
      key: 'delete',
    },
  ];

  return (
    <div>
      {model.notes.map((item) => {
        console.log(item);
        return (
          <Dropdown
            key={item.id}
            menu={{
              items,
              onClick: (info) => {
                if (info.key === 'delete') {
                  model.deleteNotes(item.id);
                }
              },
            }}
            trigger={['contextMenu']}
          >
            <div
              style={{
                background: model.activeNoteId === item.id ? 'red' : '#fff',
              }}
              onClick={() => handleSelect(item)}
            >
              <div>{item.id}</div>
            </div>
          </Dropdown>
        );
      })}
    </div>
  );
});

const HomePage: React.FC = () => {
  const model = useMemo(() => {
    return new NotesDataModel();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await login();
      await model.init();

      // console.log(model.notes);

      model.setActiveNoteId(model.notes?.[0]?.id);
    })();
  }, [model]);

  const handleSync = useCallback(async () => {
    try {
      const { notes, categories } = model;
      if (notes && categories) {
        setLoading(true);
        await syncData(notes, categories);
        setLoading(false);
        message.success('同步成功！');
      }
    } catch (err) {
      setLoading(false);
      message.error('同步错误！');
      console.log(err);
    }
  }, [model]);

  const handleAddNote = useCallback(() => {
    model.addNotes();
  }, [model]);

  return (
    <DataModelProvider value={{ value: model }}>
      <SplitPane split="vertical" minSize={200}>
        <div>
          <Button onClick={handleAddNote}>新增note</Button>
        </div>
        <SplitPane split="vertical" minSize={200}>
          <div>
            <NoteLists />
          </div>
          <div>
            <Detail />
            {loading ? (
              <LoadingOutlined />
            ) : (
              <SyncOutlined onClick={handleSync} />
            )}
          </div>
        </SplitPane>
      </SplitPane>
    </DataModelProvider>
  );
};

export default observer(HomePage);
