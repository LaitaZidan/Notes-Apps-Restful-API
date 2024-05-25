import { deleteNote, archiveNote, unarchiveNote } from '../api/notesApi';
import Swal from 'sweetalert2';
import { fetchAndRenderNotes } from '../index';

class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const id = this.getAttribute('id');
    const archived = this.getAttribute('archived') === 'true';
    
    this.innerHTML = `
      <div class="note-card" id="note-${id}">
        <h2>${title}</h2>
        <p>${body}</p>
        <button class="archive-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128" id="archive"><path stroke="#4D869C" stroke-width="10" d="M23 43V71.5C23 88.8444 23 97.5166 27.4389 103.583C28.8331 105.488 30.5123 107.167 32.4175 108.561C38.4834 113 47.1556 113 64.5 113V113C81.8444 113 90.5166 113 96.5825 108.561C98.4877 107.167 100.167 105.488 101.561 103.583C106 97.5166 106 88.8444 106 71.5V43"></path><rect width="97" height="30" x="16" y="16" stroke="#4D869C" stroke-width="10" rx="15"></rect><path stroke="#4D869C" stroke-linecap="round" stroke-width="10" d="M65 92L65 68M75 82L66.4142 90.5858C65.6332 91.3668 64.3668 91.3668 63.5858 90.5858L55 82"></path></svg>
        </button>
        <button class="unarchive-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128" id="unarchive"><path stroke="#4D869C" stroke-width="10" d="M23 43V71.5C23 88.8444 23 97.5166 27.4389 103.583C28.8331 105.488 30.5123 107.167 32.4175 108.561C38.4834 113 47.1556 113 64.5 113V113C81.8444 113 90.5166 113 96.5825 108.561C98.4877 107.167 100.167 105.488 101.561 103.583C106 97.5166 106 88.8444 106 71.5V43"></path><rect width="97" height="30" x="16" y="16" stroke="#4D869C" stroke-width="10" rx="15"></rect><path stroke="#4D869C" stroke-linecap="round" stroke-width="10" d="M65 68L65 92M55 78L63.5858 69.4142C64.3668 68.6332 65.6332 68.6332 66.4142 69.4142L75 78"></path></svg>
        </button>
        <button class="delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>
        </button>
      </div>
    `;

    this.querySelector('.archive-button').addEventListener('click', async (event) => { 
      event.stopPropagation(); // Mencegah pemicu event listener di elemen induk
      await archiveNoteHandler(id);
    });

    this.querySelector('.unarchive-button').addEventListener('click', async (event) => {
      event.stopPropagation(); // Mencegah pemicu event listener di elemen induk
      await unarchiveNoteHandler(id);
    });

    // button delete
    this.querySelector('.delete-button').addEventListener('click', async (event) => {
      event.stopPropagation(); // Mencegah pemicu event listener di elemen induk
      await deleteNoteHandler(id);
    });
  }
}

customElements.define('note-item', NoteItem);


async function archiveNoteHandler(noteId) {
  try {
    await archiveNote(noteId);
    fetchAndRenderNotes(); // Merefetch catatan setelah mengarsipkan
  } catch (error) {
    showErrorAlert();
  }
}

async function unarchiveNoteHandler(noteId) {
  try {
    await unarchiveNote(noteId);
    fetchAndRenderNotes(); // Merefetch catatan setelah mengembalikan dari arsip
  } catch (error) {
    showErrorAlert();
  }
}

async function deleteNoteHandler(noteId) {
  try {
    await deleteNote(noteId);
    fetchAndRenderNotes(); // Merefetch catatan setelah dihapus
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
