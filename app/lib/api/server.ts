const API_BASE_URL = 'http://localhost:8080/';

export async function serverFetch<T>(
  path: string,
  request: Request,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401)
      throw new Response('Unauthorized', { status: 401 });
    throw new Response('API Error', { status: response.status });
  }

  return response.json();
}
