import './styles.css';
import './components/AppBar';
import './components/NoteInput';
import './components/NoteItem';
import { getNotes, deleteNote, archiveNote, unarchiveNote } from './api/notesApi';
import { showLoadingIndicator, hideLoadingIndicator } from './utils/loadingIndicator';

const notesContainer = document.querySelector('.notes-container');

async function fetchAndRenderNotes() {
  showLoadingIndicator();
  const notes = await getNotes();
  hideLoadingIndicator();
  renderNotes(notes);
}

function renderNotes(notes) {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteItem = document.createElement('note-item');
    noteItem.setAttribute('title', note.title);
    noteItem.setAttribute('body', note.body);
    noteItem.setAttribute('id', note.id);
    noteItem.setAttribute('archived', note.archived); // Tambahkan atribut archived
    noteItem.addEventListener('click', async () => {
      await deleteNoteHandler(note.id);
    });
    noteItem.addEventListener('click', async () => {
      await archiveNoteHandler(note.id);
    });
    noteItem.addEventListener('click', async () => {
      await unarchiveNoteHandler(note.id);
    });
    notesContainer.appendChild(noteItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderNotes();
  document.querySelector('note-input').addEventListener('note-added', fetchAndRenderNotes);
});

async function deleteNoteHandler(noteId) {
  try {
    await deleteNote(noteId);
    fetchAndRenderNotes();
  } catch (error) {
    showErrorAlert();
  }
}

async function archiveNoteHandler(noteId) {
  try {
    await archiveNote(noteId);
    fetchAndRenderNotes(); 
  } catch (error) {
    showErrorAlert();
  }
}

async function unarchiveNoteHandler(noteId) {
  try {
    await unarchiveNote(noteId);
    fetchAndRenderNotes();
  } catch (error) {
    showErrorAlert();
  }
}

function showErrorAlert() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Terjadi kesalahan. Silakan coba lagi.',
  });
}

export { fetchAndRenderNotes };