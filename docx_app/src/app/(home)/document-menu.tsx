import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Update this based on your UI library
import { useRouter } from "next/router";
import { RemoveDialog } from "./remove-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RemoveDialog documentId={documentId}>
           <DropdownMenuItem onSelect={(e)=>e.preventDefault()}
           onClick={(e)=>e.stopPropagation()}>
             <TrashIcon className="size-4mr-2"/>
             Remove
           </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in a New Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
