import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

export default function CodeEditorWindow({ monaco, onChange, language, code, theme, setUserCode }: any) {
  const [value, setValue] = useState(code || "");
  const [retry, setRetry] = useState(true)

  useEffect(() => {
    
    if (monaco) {
      monaco.editor.defineTheme('my-theme', {
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
    }
    console.log('asd')
  }, [monaco]);
  const handleEditorChange = (value: any) => {
    setValue(value);
    setUserCode(value);
  };

  return (
    <div className="overflow-hidden w-full h-full">

      <Editor
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme="my-theme"
        defaultValue={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};
