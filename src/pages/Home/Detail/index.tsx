import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import { observer } from 'mobx-react-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDataModel } from '../hooks';

const mdParser = new MarkdownIt();

mdParser.use(container, '', {
  marker: '-',
  validate: (params: string) => {
    return !params;
  },
  render: () => {
    return '';
  },
});

export const Detail = observer(() => {
  const model = useDataModel();

  return (
    <div>
      {model?.ActiveNote?.created}
      <br />
      {model?.ActiveNote?.lastUpdated}
      <MdEditor
        value={model?.ActiveNote?.text}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => {
          model?.updateContentById(model.activeNoteId, text);
        }}
      />
    </div>
  );
});
