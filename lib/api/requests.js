export async function fetchRequests() {
  const res = await fetch("/api/requests");
  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }
  return res.json();
}
