const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API error');
  }
  return res.json();
}

export async function fetchMessagesApi() {
  const res = await fetch(`${API_BASE_URL}/api/messages`);
  return handleResponse(res);
}

export async function addMessageApi(payload) {
  const res = await fetch(`${API_BASE_URL}/api/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function fetchTagsApi(query) {
  const url =
    query && query.length > 0
      ? `${API_BASE_URL}/api/tags?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/api/tags`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function addTagApi(name) {
  const res = await fetch(`${API_BASE_URL}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return handleResponse(res);
}
