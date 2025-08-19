import test from "node:test";
import assert from "node:assert/strict";
import { fetchRequests } from "./requests.js";

test("fetchRequests returns data on success", async () => {
  const mockData = [
    {
      id: "1",
      clientId: "client1",
      title: "Test",
      description: "Desc",
      category: "Logo Design",
      status: "pending",
      priority: "low",
      deadline: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(mockData), { status: 200 });

  const data = await fetchRequests();
  assert.deepStrictEqual(data, mockData);

  globalThis.fetch = originalFetch;
});

test("fetchRequests throws on failure", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("Error", { status: 500 });

  await assert.rejects(() => fetchRequests());

  globalThis.fetch = originalFetch;
});
