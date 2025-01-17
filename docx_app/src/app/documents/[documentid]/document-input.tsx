import { BsCloudCheck, BsPencil, BsX, BsCheck } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateById);

  // Handle save functionality
  const handleSave = async () => {
    if (!value.trim()) {
      setIsError(true);
      return;
    }

    setIsPending(true);
    setIsError(false);

    try {
      await mutate({ id, title: value.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update document title", error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  // Handle cancel functionality
  const handleCancel = () => {
    setValue(title); // Revert to the original title
    setIsEditing(false);
    setIsError(false);
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`border p-1 rounded ${
              isError ? "border-red-500" : "border-gray-300"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button
            onClick={handleSave}
            disabled={isPending}
            className="text-green-500 hover:text-green-700"
          >
            <BsCheck size={18} />
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="text-red-500 hover:text-red-700"
          >
            <BsX size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className="text-lg px-1.5 cursor-pointer truncate"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <BsPencil size={18} />
          </button>
        </div>
      )}
      {!isEditing && !isError && <BsCloudCheck size={18} className="text-blue-500" />}
      {isError && (
        <span className="text-red-500 text-sm">Failed to save. Try again.</span>
      )}
    </div>
  );
};

export default DocumentInput;
