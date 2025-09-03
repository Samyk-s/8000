"use client";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    toolbarButtonSize: "medium",
    buttons: "undo,redo,bold,italic,underline,ul,ol,link,image,fontsize,brush",
    height: 400,
    placeholder: "Description",
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
