import React, { useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme, setUserCode}:any) => {
  const [value, setValue] = useState(code || "");
  const monaco:any = useMonaco();


  const handleEditorChange = (value:any) => {
    setValue(value);
    setUserCode(value);
  };

  monaco.editor.defineTheme('default', {
    base: 'vs-dark',
    inherit: true,
    "rules": [
      {
        "foreground": "aeaeae",
        "token": "comment"
      },
      {
        "foreground": "FB923C",
        "token": "keyword"
      },
      {
        "foreground": "FB923C",
        "token": "storage"
      },
      {
        "foreground": "FB923C",
        "token": "string"
      },
    ],
    "colors": {
      "editor.background": "#09090B",

    }
    });
monaco.editor.setTheme('default')

  return (
    <div className="overflow-hidden w-full h-full">
      <Editor

        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme="vs-dark"
        defaultValue={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;