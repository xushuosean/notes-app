import { Dropdown, MenuProps } from 'antd';
import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useDataModel } from '../hooks';
import { NoteData } from '../NotesDataModel';
import styles from './index.less';

const NoteList = observer(() => {
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
    <div className={styles.noteList}>
      {model.notes.map((item) => {
        console.log(toJS(item));
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
              className={classNames(styles.note, {
                [styles.note_active]: model.activeNoteId === item.id,
              })}
              onClick={() => handleSelect(item)}
            >
              <div className={styles.note_header}>
                <div className={styles.note_header_title}>{item.name}</div>
                <div className={styles.note_header_time}>2小时前</div>
              </div>
              <div className={styles.note_content}>{item.name}</div>
              <div className={styles.note_tags}>
                <div className={styles.note_tags_item}>#工作</div>
                <div className={styles.note_tags_item}>#学习</div>
              </div>
            </div>
          </Dropdown>
        );
      })}
    </div>
  );
});

export default NoteList;
