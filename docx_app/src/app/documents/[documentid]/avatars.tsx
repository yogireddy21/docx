"use client";
import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const size = 32; // Slightly smaller size for Google Docs style // Amount of overlap between avatars

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const self = useSelf();

  if (users.length === 0 && !self) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <div className="flex -space-x-4"> {/* Creates the overlapping effect */}
          {self && (
            <Avatar 
              src={self.info?.avatar || ""} 
              name="You" 
            />
          )}
          {users.map(({ connectionId, info }) => (
            info && (
              <Avatar
                key={connectionId}
                src={info.avatar || ""}
                name={info.name || "Unknown"}
              />
            )
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="h-5" />
    </div>
  );
};

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div className="relative group">
      <div
        style={{ width: size, height: size }}
        className="rounded-full border-[2px] border-white ring-2 ring-gray-50 overflow-hidden bg-gray-200 flex items-center justify-center"
      >
        {src ? (
          <img 
            src={src} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium uppercase">
            {name.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 transform translate-y-full opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none transition-opacity z-50">
        {name}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
      </div>
    </div>
  );
};