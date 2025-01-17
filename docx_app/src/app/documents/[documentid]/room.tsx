"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";

export function Room({ children }: { children: ReactNode }) {
 const params=useParams();
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider id={params.documentid as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Room Loading"/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}