"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@radix-ui/react-context-menu";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlus, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";

interface ToolbarButtonProps{
    onClick?: () =>void;
    isActive?:boolean;
    icon:LucideIcon;
}

const ToolbarButton=({
    onClick,
    isActive,
    icon:Icon,
}:ToolbarButtonProps)=>{
    return(
        <button onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center jusitfy-center rounded-sm hover:bg-neutral-200/80",
                isActive&&"bg-neutral-200/80"
            )}>
            <Icon className="size-4"/>
            
        </button>
    )
}
export const  Toolbar= () => {
    const {editor} = useEditorStore();
    console.log("tool bar editor:",{editor});
    const sections:{
        label:string;
        icon:LucideIcon;
        onClick: ()=>void;
        isActive?: boolean;
    }[][]=[
      [
        {
            label:"Undo",
            icon:Undo2Icon,
            onClick:()=>editor?.chain().focus().undo().run(),
        },
        {
            label:"Redo",
            icon:Redo2Icon,
            onClick:()=> editor?.chain().focus().redo().run(),
        },
        {
            label:"Print",
            icon:PrinterIcon,
            onClick:()=> window.print(),
        },
        {
            label:"Spell Check",
            icon:SpellCheckIcon,
            onClick:()=> {
                const cur=editor?.view.dom.getAttribute("spellcheck");
                editor?.view.dom.setAttribute("spellcheck",cur==="false"?"true":"false");

            },
        },
      ],
      [
        {
            label:"Bold",
            icon:BoldIcon,
            isActive:editor?.isActive("bold"),
            onClick:()=>editor?.chain().focus().setBold().run(),
        },
         {
            label:"Italic",
            icon:ItalicIcon,
            isActive:editor?.isActive("italic"),
            onClick:()=>editor?.chain().focus().toggleItalic().run(),
        },
         {
            label:"Underline",
            icon:UnderlineIcon,
            isActive:editor?.isActive("underline"),
            onClick:()=>editor?.chain().focus().toggleUnderline().run(),
        },
      ],
      [
        {
            label:"Comment",
            icon:MessageSquarePlus,
            onClick:()=>console.log("TODP:Comment"),
            isActive:false,
        },
        {
            label:"List Todo",
            icon:ListTodoIcon,
            onClick:()=>editor?.chain().focus().toggleTaskList().run(),
             isActive:editor?.isActive("tasklist"),
        },
        {
            label:"Remove Formatting",
            icon:RemoveFormattingIcon,
            onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
        
        },
      ]
    ];
    return ( 
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto">
            {sections[0].map((item)=>(
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO:Font fmaily*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO:Heading*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO:FontSze*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item)=>(
                <ToolbarButton key={item.label} {...item} /> 
                ))}
             {/* TODO:Heading*/}
             {/* TODO:Heading*/}
             <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
              {/* TODO:Heading*/}
             {/* TODO:Heading*/}
              {/* TODO:Heading*/}
             {/* TODO:Heading*/}
              {/* TODO:Heading*/}
              {sections[2].map((item)=>(
                <ToolbarButton key={item.label} {...item} /> 
                ))}
             
            

        </div>
     );
}
 
