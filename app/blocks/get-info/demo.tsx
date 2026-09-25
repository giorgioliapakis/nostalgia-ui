"use client"

import * as React from "react"

import {
  GetInfoBlock,
  type GetInfoItem,
} from "@/registry/new-york/blocks/get-info"

const APP: GetInfoItem = {
  name: "SimpleText",
  kind: "application program",
  type: "application",
  size: "668K on disk (681,229 bytes)",
  where: "Macintosh HD: Applications (Mac OS 9):",
  created: "Thu, Oct 11, 2001, 12:00 PM",
  modified: "Thu, Oct 11, 2001, 12:00 PM",
  version: "1.4, © Apple Computer, Inc. 1985-1999",
  label: "none",
  comments: "",
  memory: { suggested: 512, minimum: 256, preferred: 1024 },
}

const DOC: GetInfoItem = {
  name: "Letter to Grandma",
  kind: "SimpleText text document",
  type: "document",
  size: "4K on disk (1,387 bytes)",
  where: "Macintosh HD: Documents:",
  created: "Mon, Mar 18, 2002, 5:12 PM",
  modified: "Mon, Mar 18, 2002, 5:42 PM",
  label: "personal",
  comments: "Don't forget to print this before Sunday.",
  sharing: { shared: true, owner: "Owner", everyone: "read-only" },
}

export function GetInfoDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <GetInfoBlock item={APP} className="flex-[1_1_300px]" />
      <GetInfoBlock item={DOC} className="flex-[1_1_300px]" />
    </div>
  )
}
