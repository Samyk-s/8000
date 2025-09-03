"use client";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("<p>Hello world!</p>");

  const config = {
    readonly: false,
    toolbarButtonSize: "medium",
    buttons: "undo,redo,bold,italic,underline,ul,ol,link,image,fontsize,brush",
    height: 400,
  };

  return (
    <JoditEditor
      ref={editor}
      // defaultValue={}
      value={content}
      config={config as any}
      onBlur={(newContent) => setContent(newContent)} // update state only on blur
    />
  );
};

export default TextEditor;
