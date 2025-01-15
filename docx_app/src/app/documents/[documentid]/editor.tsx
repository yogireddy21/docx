"use client";
import {useEditor , EditorContent} from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'
import { useEditorStore } from '@/store/use-editor-store';
import {Color} from  '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { FontSizeExtension } from '@/extensions/fontSize';
import { LineHeightExtension } from '@/extensions/lineHeight';
import Ruler from './ruler';

export const Editor = () =>{
const {setEditor}=useEditorStore();
const editor = useEditor({
    immediatelyRender:false,
    onCreate({editor}){
        setEditor(editor);
    },
    onDestroy(){
        setEditor(null);
    },
    onUpdate({editor}){
        setEditor(editor);
    },
    onSelectionUpdate({editor}){
        setEditor(editor);
    },
    onTransaction({editor}){
        setEditor(editor);
    },
    onFocus({editor}){
        setEditor(editor);
    },
    onBlur({editor}){
        setEditor(editor);
    },
    onContentError({editor}){
        setEditor(editor);
    },
    editorProps:{
      attributes:{
        style:"padding-left:56px; padding-right:56px;",
         class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
      },
    },
    extensions: [
        StarterKit,
        TaskItem.configure({
            nested:true,
        }),
        TaskList,
        Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor:true,
      }),
      Link.configure({
        openOnClick:false,
        autolink:true,
        defaultProtocol:"https",
      }),
      TextAlign.configure({
        types:["heading","paragrpah"]
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types:["heading","paragraph"],
        defaultLineHeight:"normal"
      }),

    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
})
   return (
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <Ruler/>
            <div className='min-w-max flex justify-center w-{816px} py:4 print:py-0 mx-auto print:w-full print:min-w-0' >
                <EditorContent editor={editor}/>
            </div>
        </div>
   );
};