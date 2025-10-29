const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error fetching data");
  }

  return res.json();
}
