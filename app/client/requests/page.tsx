"use client";

import { useEffect, useState } from "react";

import { RequestList } from "@/components/request-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRequests } from "@/lib/api/requests";
import { DesignRequest } from "@/types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
        setError("Failed to load requests");
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <RequestList requests={requests} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}