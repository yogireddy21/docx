"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  FileText,
  Wand2,
  Type,
  Maximize2,
  CheckCircle2,
  Briefcase,
  Lightbulb,
  AlertCircle,
  BookMarked,
  Code2,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AIButton = () => {
  const { editor } = useEditorStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAIOperation = async (operation: string) => {
    try {
      if (!editor) return;

      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

      if (!selectedText) {
        console.error("No text selected");
        return;
      }

      setIsLoading(true);

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: selectedText,
          operation: operation,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      editor.chain().focus().deleteSelection().insertContent(data.result).run();
    } catch (error) {
      console.error("AI operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const aiOperations = [
    { label: "Answer", icon: MessageSquare, operation: "answer" },
    { label: "Summarize", icon: FileText, operation: "summarize" },
    { label: "Improve", icon: Wand2, operation: "improve" },
    { label: "Explain", icon: Type, operation: "explain" },
    { label: "Expand", icon: Maximize2, operation: "expand" },
    { label: "Proofread", icon: CheckCircle2, operation: "proofread" },
    { label: "Professional", icon: Briefcase, operation: "professionalize" },
    { label: "Ideas", icon: Lightbulb, operation: "generate_ideas" },
    { label: "Analyze", icon: AlertCircle, operation: "analyze" },
    { label: "Notes", icon: BookMarked, operation: "research_notes" },
    { label: "Code", icon: Code2, operation: "generate_code" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-8 min-w-8 flex items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 text-sm"
          disabled={isLoading}
        >
          <Sparkles className="size-5" />
          {isLoading && <span className="ml-1 animate-spin">⚪</span>}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 p-1 grid grid-cols-2 gap-2">
        {aiOperations.map(({ label, icon: Icon, operation }) => (
          <DropdownMenuItem
            key={operation}
            onClick={() => handleAIOperation(operation)}
            className="flex items-center gap-x-2 px-2 py-1.5 cursor-pointer text-sm"
            disabled={isLoading}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
