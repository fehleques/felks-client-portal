"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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

export async function fetchRequest(id: string): Promise<DesignRequest> {
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

export default function RequestPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<DesignRequest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRequest(id)
        setRequest(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load request"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <RequestError message={error} />
  }

  if (!request) {
    return <div className="p-4">No request found.</div>
  }

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
}

