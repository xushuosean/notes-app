import { login, syncData } from '@/services/home/api';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Detail } from './Detail';
import { DataModelProvider } from './hooks';
import NoteList from './NoteList';
import { NotesDataModel } from './NotesDataModel';
import SideBar from './SideBar';

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
      const { notes } = model;
      if (notes) {
        setLoading(true);
        await syncData(notes);
        setLoading(false);
        message.success('同步成功！');
      }
    } catch (err) {
      setLoading(false);
      message.error('同步错误！');
      console.log(err);
    }
  }, [model]);

  const handlePullContent = useCallback(() => {
    try {
      model.getNotes();
    } catch (err) {
      message.error('获取失败！');
      console.log(err);
    }
  }, [model]);

  return (
    <DataModelProvider value={{ value: model }}>
      <SplitPane split="vertical" minSize={255}>
        <SideBar />
        <SplitPane split="vertical" minSize={320}>
          <NoteList />
          <div>
            <Detail />
            {loading ? (
              <LoadingOutlined />
            ) : (
              <SyncOutlined onClick={handleSync} />
            )}

            <div onClick={handlePullContent}>使用github内容覆盖</div>
          </div>
        </SplitPane>
      </SplitPane>
    </DataModelProvider>
  );
};

export default observer(HomePage);
