import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import { Divider } from 'antd';
import * as matter from 'gray-matter';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
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

function getFrontmatter(markdownContent: string) {
  return matter.default(markdownContent);
}

type ContentHeaderProps = {
  frontmatter: { [key: string]: any };
};
const ContentHeader: FC<ContentHeaderProps> = ({ frontmatter }) => {
  return (
    <div>
      {Object.keys(frontmatter).map((key) => {
        return (
          <div key={key} style={{ fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: '#ccc' }}>{key}</span>:{' '}
            <span style={{ color: 'gray' }}>
              {frontmatter?.[key].toString()}
            </span>
          </div>
        );
      })}
      <Divider />
    </div>
  );
};

export const Detail = observer(() => {
  const model = useDataModel();

  return (
    <div>
      <MdEditor
        style={{ height: '100vh' }}
        value={model?.ActiveNote?.content}
        renderHTML={(text) => {
          const data = getFrontmatter(text);
          return (
            <div>
              <ContentHeader frontmatter={data.data} />
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(data.content),
                }}
              ></div>
            </div>
          );
        }}
        onChange={({ text }) => {
          model?.updateContentById(model.activeNoteId, text);
        }}
      />
    </div>
  );
});
