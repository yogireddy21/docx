"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@radix-ui/react-context-menu";
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlus, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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
            {/* TODO:Heading*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO:FontSze*/}
            <Separator aria-orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item)=>(
                <ToolbarButton key={item.label} {...item} /> 
                ))}
             {/* TODO:Text-color*/}
             {/* TODO:Highlight color*/}
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
 
