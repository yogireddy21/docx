"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@radix-ui/react-context-menu";
import { BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlus, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import type { Level } from "@tiptap/extension-heading";
import {type ColorResult,CirclePicker,SketchPicker} from "react-color";
import { useState } from "react";

const TextHighlightButton = () => {
    const { editor } = useEditorStore();
    const [highlightColor, setHighlightColor] = useState(editor?.getAttributes('highlight').color || "#FFFFFF"); // Default yellow for highlighting

    const onChange = (color: ColorResult) => {
        setHighlightColor(color.hex); // Update the local state
        editor?.chain().focus().setHighlight({color: color.hex}).run(); // Apply the selected highlight color to the text
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0">
                {/* SketchPicker for selecting highlight color */}
                <SketchPicker
                    color={highlightColor} // The current highlight color
                    onChange={onChange} // Apply the selected highlight color
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value=editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color:ColorResult)=>{
       editor?.chain().focus().setColor(color.hex).run(); 
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-xs">
                        A
                    </span>
                    <div className="h-0.5 w-full" style={{backgroundColor:value}}/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0">
                {/* CirclePicker for selecting color */}
                <SketchPicker
                     
                    color={value} // The current color
                    onChange={onChange}// Call this when the user selects a color
                   // Spacing between color circles
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
const HeadingLevelButton=()=>{
    const { editor } = useEditorStore();
    const headings =[
        { label: 'Normal Text', value: 0, fontSize: '16px' },
        { label: 'Heading 1', value: 1, fontSize: '32px' },
        { label: 'Heading 2', value: 2, fontSize: '28px' },
        { label: 'Heading 3', value: 3, fontSize: '24px' },
        { label: 'Heading 4', value: 4, fontSize: '20px' },
        { label: 'Heading 5', value: 5, fontSize: '18px' },
        { label: 'Heading 6', value: 6, fontSize: '16px' }
    ];
    
    const getCurrentHeading =()=>{
        for(let level=1;level<=6;level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`;
            }
        }
        return "Normal Text";
    };
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                   <span className="truncate">
                       {getCurrentHeading()}
                   </span>
                   <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                 {headings.map(({label,value,fontSize})=>(
                     <button onClick={()=> {
                        if(value===0) editor?.chain().setParagraph().run();
                        else editor?.chain().toggleHeading({level:value as Level}).run();
                     }} key={value} className={cn(
                           (value===0 &&!editor?.isActive("heading"))||editor?.isActive("heading",{level:value}) && "bg-neutral-200/80"
                        )} style={{ fontSize }} >
                            {label}
                        </button>
                 ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const FontFamilyButton = ()=>{
    const {editor} =useEditorStore();
    const fonts= [
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Courier New', value: '"Courier New", monospace' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Tahoma', value: 'Tahoma, sans-serif' },
        { label: 'Roboto', value: 'Roboto, sans-serif' },
        { label: 'Open Sans', value: '"Open Sans", sans-serif' }
    ];

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                   <span className="truncate">
                       {editor?.getAttributes("textStyle").fontFamily||"Arial"}
                   </span>
                   <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {fonts.map(({label,value})=>(
                        <button onClick={()=> editor?.chain().focus().setFontFamily(value).run()} key={value} className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )} style={{fontFamily:value}}>
                            <span className="text-sm">{label}</span>

                        </button>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
     
};
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
            <FontFamilyButton/>
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
           <HeadingLevelButton/>
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO:FontSze*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item)=>(
                <ToolbarButton key={item.label} {...item} /> 
                ))}
            <TextColorButton/>
            <TextHighlightButton/>
             <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
              {/* TODO:Link*/}
             {/* TODO:Image*/}
              {/* TODO:Align*/}
             {/* TODO:Line-height*/}
              {/* TODO:List */}
              {sections[2].map((item)=>(
                <ToolbarButton key={item.label} {...item} /> 
                ))}
             
            

        </div>
     );
}
 
