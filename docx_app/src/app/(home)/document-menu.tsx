import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MoreVertical, TrashIcon, Edit3 } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Update this based on your UI library
import { RemoveDialog } from "./remove-dialog";
import { RenameDialog } from "./rename-dialog"; // Import RenameDialog

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
        {/* Rename Document Option */}
        <RenameDialog documentId={documentId} currentTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>

        {/* Remove Document Option */}
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>

        {/* Open in New Tab Option */}
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="w-4 h-4 mr-2" />
          Open in a New Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
