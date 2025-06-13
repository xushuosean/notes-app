import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
// import MdEditor from 'react-markdown-editor-lite';
// import style manually
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import MonacoEditor from 'react-monaco-editor';
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

  useEffect(() => {
    console.log(model?.ActiveNote?.content);
  }, [model?.ActiveNote?.content]);

  return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="markdown"
        theme="vs-light"
        value={model?.ActiveNote?.content}
        options={{
          selectOnLineNumbers: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollbar: {
            useShadows: true,
          },
        }}
      />
    </div>
  );
});
