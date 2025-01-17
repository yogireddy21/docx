'use client';

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { RenameDialog } from '@/app/(home)/rename-dialog';
import { RemoveDialog } from '@/app/(home)/remove-dialog';
import DocumentInput from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  FileIcon,
  FilePlusIcon,
  FileEditIcon,
  PrinterIcon,
  TrashIcon,
  UndoIcon,
  RedoIcon,
  TableIcon,
  BoldIcon,
  ItalicIcon,
  FileJson2Icon,
  FileTypeIcon,
  FileTextIcon,
  TypeIcon,
} from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Avatars } from './avatars';
import Inbox from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface NavbarProps {
  data: Doc<"documents">;
}
const Navbar = ({data}:NavbarProps) => {
  const router = useRouter();
const mutation = useMutation(api.documents.create);

const onNewDocument = () => {
  mutation({
    title: "Untitled Document",
    initialContent: ""
  })
    .then((id) => {
      toast.success("Document created");
      router.push(`/documents/${id}`);
    })
    .catch(() => toast.error("Something went wrong"));
}


const {editor} =useEditorStore();
  const tableOptions = [
    { rows: 1, cols: 1 },
    { rows: 2, cols: 2 },
    { rows: 3, cols: 3 },
    { rows: 4, cols: 4 },
  ];

  const insertTable =({rows,cols} :{ rows:number ,cols:number}) =>{
     editor?.chain().focus().insertTable({rows,cols,withHeaderRow:false}).run();
  };
  const onDownload = (blob: Blob , filename:string) =>{
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url;
    a.download=filename;
    a.click();
  }

  const onSaveJSON = ()=>{
    if(!editor) return;
    const content= editor.getJSON();
    const blob= new Blob([JSON.stringify(content)],{
        type: 'application/json',
    });
    onDownload(blob,`${data.title}.json`)
  }
  const onSaveHTML = ()=>{
    if(!editor) return;
    const content= editor.getHTML();
    const blob= new Blob([content],{
        type: 'text/html',
    });
    onDownload(blob,`${data.title}.html`)
  }
 
  return (
    <nav className="flex items-center justify-between p-0 shadow-sm bg-white">
      {/* Left Section: Logo + Document Input */}
      <div className="flex gap-4 items-start">
        {/* Logo Centered */}
        <div className="flex items-center justify-center w-[40px] h-[40px]">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
          </Link>
        </div>

        {/* Document Title & Menubar */}
        <div className="flex flex-col">
          {/* Document Title */}
          <DocumentInput title={data.title} id={data._id}/>
          
          {/* Menubar Below Title */}
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              {/* File Menu */}
              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <FileIcon className="w-4 h-4 mr-2" />
                  File
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="w-4 h-4 mr-2" />
                    New Document
                  </MenubarItem>
                  
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileTypeIcon className="w-4 h-4 mr-2" />
                      Save As
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={()=> window.print()}>
                        <FileTextIcon className="w-4 h-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}> 
                        <FileTextIcon className="w-4 h-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJson2Icon className="w-4 h-4 mr-2" />
                        JSON
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  

                   <RenameDialog documentId={data._id} currentTitle={data.title}>
                    <MenubarItem  onClick={(e) =>e.stopPropagation()}
                    onSelect={(e)=>e.preventDefault()}>
                     <FileEditIcon className="w-4 h-4 mr-2" />
                    Rename
                  </MenubarItem>
                   </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem onClick={(e) =>e.stopPropagation()}
                    onSelect={(e)=>e.preventDefault()}>
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Remove
                  </MenubarItem>
                  </RemoveDialog>
                  <MenubarItem onSelect={() => window.print()}>
                    <PrinterIcon className="w-4 h-4 mr-2" />
                    Print
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Edit Menu */}
              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <FileEditIcon className="w-4 h-4 mr-2" />
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={()=>editor?.chain().focus().undo().run()}>
                    <UndoIcon className="w-4 h-4 mr-2" />
                    Undo
                  </MenubarItem>
                  <MenubarItem onClick={()=>editor?.chain().focus().redo().run()}>
                    <RedoIcon className="w-4 h-4 mr-2" />
                    Redo
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Insert Menu */}
              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <TableIcon className="w-4 h-4 mr-2" />
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="w-4 h-4 mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {tableOptions.map(({ rows, cols }) => (
                        <MenubarItem 
                        onClick={()=>insertTable({rows,cols})}
                          key={`${rows}x${cols}`}
                          
                        >
                          {`${rows}x${cols} Table`}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              {/* Format Menu */}
              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TypeIcon className="w-4 h-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={()=>editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className="w-4 h-4 mr-2" />
                        Bold
                      </MenubarItem>
                      <MenubarItem onClick={()=>editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className="w-4 h-4 mr-2" />
                        Italic
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        
        <Avatars/>
        
        <Inbox/>
        
        

         <OrganizationSwitcher afterCreateOrganizationUrl="/"
         afterSelectOrganizationUrl="/"
         afterLeaveOrganizationUrl="/"
         afterSelectPersonalUrl="/"
         />
         <UserButton/>
      </div>
    </nav>
  );
};

export default Navbar;