import type { DesignRequest } from "@/types"

const mockRequests: Record<string, DesignRequest> = {
  req1: {
    id: "req1",
    clientId: "client1",
    title: "Logo redesign",
    description: "Redesign the company logo to be more modern.",
    category: "Logo Design",
    status: "pending",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  req2: {
    id: "req2",
    clientId: "client2",
    title: "Landing page design",
    description: "Need a responsive landing page for product launch.",
    category: "Web Design",
    status: "in_progress",
    priority: "medium",
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

export function generateStaticParams() {
  return Object.keys(mockRequests).map((id) => ({ id }))
}

async function fetchRequest(id: string): Promise<DesignRequest> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const request = mockRequests[id]
  if (!request) {
    throw new Error("Request not found")
  }
  return request
}

function RequestError({ message }: { message: string }) {
  return <div className="p-4 text-red-500">{message}</div>
}

export default async function RequestPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const request = await fetchRequest(params.id)
    return (
      <div className="p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{request.title}</h1>
          <p className="text-sm text-muted-foreground">ID: {request.id}</p>
        </div>
        <p className="text-muted-foreground">{request.description}</p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Category: {request.category}</p>
          <p>Priority: {request.priority}</p>
          <p>Status: {request.status}</p>
          <p>Deadline: {new Date(request.deadline).toLocaleDateString()}</p>
        </div>
      </div>
    )
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load request"
    return <RequestError message={message} />
  }
}

