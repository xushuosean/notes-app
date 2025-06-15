import { BookFilled, StarFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useDataModel } from '../hooks';
import styles from './index.less';

const SideBar = () => {
  const model = useDataModel();

  const handleAddNote = useCallback(() => {
    model?.addNotes();
  }, [model]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.addButton} onClick={handleAddNote}>
        新建笔记
      </div>
      <Divider />
      <div className={styles.sideMenu}>
        <div
          className={classNames(styles.sideMenuItem, styles.sideMenuItemActive)}
        >
          <BookFilled />
          全部笔记
        </div>
        <div className={classNames(styles.sideMenuItem)}>
          <StarFilled />
          收藏笔记
        </div>
      </div>
    </div>
  );
};

export default SideBar;
