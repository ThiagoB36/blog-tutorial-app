"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import EditLink from "./link/EditLink";
import GalleryModal, { ImageSelectResult } from "./GalleryModal";
import SEOForm from "./SeoForm";
import ActionButton from "../common/ActionButton";
import ThumbnailSelector from "./ThumbnailSelector";

export default function Editor() {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  const handleImageSelection = (result: ImageSelectResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          {/* Thumbnail Selector and Submit Button */}
          <div className="flex items-center justify-between mb-3">
            {/*     <ThumbnailSelector/> */}
            <div className="inline-block">
              <ActionButton title="Submit" />
            </div>
          </div>

          {/* Title input */}

          <input
            type="text"
            className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] 
            border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic 
            text-primary-dark dark: text-primary mb-3"
            placeholder="Title"
          />
          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />
          <div className="h-[1px] w-full bg-secondary-dark dark:secondary-light my-3" />
        </div>

        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:secondary-light my-3" />
        <SEOForm title="This is my Title" onChange={() => {}} />
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
      />
    </>
  );
}
