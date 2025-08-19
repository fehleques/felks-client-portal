"use client";

import { useEffect, useState } from "react";

import { RequestList } from "@/components/request-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignRequest } from "@/types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // TODO: Replace with real API call
        const data: DesignRequest[] = [];
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
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
          ) : (
            <RequestList requests={requests} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}