const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const requestHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your_token_here'
};

export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'GET',
    headers: requestHeaders,
  });
  const result = await response.json();
  return result.data;
}

export async function createNote(note) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(note),
  });
  const result = await response.json();
  return result.data;
}

export async function deleteNote(id) {
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
}

// Fungsi untuk mengarsipkan catatan
export async function archiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'PUT',
    headers: requestHeaders,
  });
}

// Fungsi untuk mengembalikan catatan dari arsip
export async function unarchiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'PUT',
    headers: requestHeaders,
  });
}