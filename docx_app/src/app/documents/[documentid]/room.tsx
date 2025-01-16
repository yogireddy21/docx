"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
 const params=useParams();
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_TFABUuN--97Ue0qhvi3wuNvocNpfX-BVHNYOJT9m8WoRQZ1mwjdc1kFCx-kUEgMa"}>
      <RoomProvider id={params.documentid as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}