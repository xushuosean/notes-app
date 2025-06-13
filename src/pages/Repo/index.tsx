import { FolderOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, List, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC, useMemo, useState } from 'react';
import RepoDataModel from './repoDataModel';

type FoldListType = {
  data: any[];
  loadData: (data: any) => Promise<any>;
  loading: boolean;
};

const FoldList: FC<FoldListType> = ({ data, loadData, loading }) => {
  return (
    <List
      bordered
      dataSource={data}
      loading={loading}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            loadData(item);
          }}
        >
          <FolderOutlined /> {item.title}
        </List.Item>
      )}
    />
  );
};

const Repo = () => {
  const model = useMemo(() => {
    return new RepoDataModel();
  }, []);

  const handleClickFold = (fold: string, index: number) => {
    model.loadData({
      repo: model.paths[0],
      path: model.paths.slice(1, index + 1).join('/'),
    });
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleOk = () => {
    model.savePath();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>选择repo</Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Select Repo"
        onOk={() => {
          handleOk();
        }}
      >
        <Breadcrumb
          items={
            model.paths.length > 0
              ? [
                  {
                    title: 'All',
                    onClick: () => {
                      model.init();
                    },
                  },
                ].concat(
                  model.paths.map((item, index) => ({
                    title: item,
                    onClick: () => {
                      if (index === model.paths.length - 1) {
                        return;
                      }
                      handleClickFold(item, index);
                    },
                  })),
                )
              : []
          }
        />
        <FoldList
          data={model.treeData}
          loadData={model.loadData.bind(model)}
          loading={model.loading}
        />
      </Modal>
    </div>
  );
};

export default observer(Repo);
