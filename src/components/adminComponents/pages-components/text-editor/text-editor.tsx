"use client";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);

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
      value={value}
      config={config as any}
      onBlur={(newContent) => {
        if (onChange) onChange(newContent);
      }}
    />
  );
};

export default TextEditor;
