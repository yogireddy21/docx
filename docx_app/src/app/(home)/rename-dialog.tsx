"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

interface RenameDialogProps {
  documentId: Id<"documents">;
  currentTitle: string; // Pass the current title for convenience
  children: React.ReactNode;
}

export const RenameDialog = ({ documentId, currentTitle, children }: RenameDialogProps) => {
  const rename = useMutation(api.documents.updateById); // Assuming you have a mutation for renaming
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [isRenaming, setIsRenaming] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Track dialog state

  const handleRename = () => {
    if (!newTitle.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    setIsRenaming(true);
    setError("");

    rename({ id: documentId, title: newTitle.trim() || "Untitled"})
      .then(() => {
        setIsRenaming(false);
        setIsOpen(false); // Close the dialog
      })
      .catch((err) => {
        setError("Failed to rename the document. Please try again.");
        console.error(err);
        setIsRenaming(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e)=>e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
            placeholder="New document name"
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <button
            className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setNewTitle(currentTitle)} // Reset to original title
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50"
            disabled={isRenaming}
            onClick={handleRename}
          >
            {isRenaming ? "Renaming..." : "Rename"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
