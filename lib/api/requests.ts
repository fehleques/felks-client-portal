import type { DesignRequest } from "../../types";

export async function fetchRequests(): Promise<DesignRequest[]> {
  const res = await fetch("/api/requests");
  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }
  return res.json();
}
