import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme, setUserCode}:any) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value:any) => {
    setValue(value);
    setUserCode(value);
    // onChange("code", value);
  };

  return (
    <div className="rounded-lg overflow-hidden w-full h-full">
      <Editor
        height="85vh"
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