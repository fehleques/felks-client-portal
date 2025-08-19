import { fetchRequests } from './requests';

describe('fetchRequests', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns data on success', async () => {
    const mockData = [
      {
        id: '1',
        clientId: 'client1',
        title: 'Test',
        description: 'Desc',
        category: 'Logo Design',
        status: 'pending',
        priority: 'low',
        deadline: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as unknown as Response);

    const data = await fetchRequests();
    expect(data).toEqual(mockData);
  });

  it('throws on failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false } as unknown as Response);
    await expect(fetchRequests()).rejects.toThrow('Failed to fetch requests');
  });
});
