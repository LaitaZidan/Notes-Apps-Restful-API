import { createNote } from '../api/notesApi';
import Swal from 'sweetalert2';

class NoteInput extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="add-note-form">
        <input type="text" id="note-title" placeholder="Judul" required>
        <span id="title-error" class="error-message"></span>
        <textarea id="note-body" placeholder="Isi Catatan" required></textarea>
        <span id="body-error" class="error-message"></span>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const titleInput = this.querySelector('#note-title');
    const bodyInput = this.querySelector('#note-body');

    titleInput.addEventListener('input', () => this.validateInput(titleInput.value.trim(), bodyInput.value.trim()));
    bodyInput.addEventListener('input', () => this.validateInput(titleInput.value.trim(), bodyInput.value.trim()));

    this.querySelector('#add-note-form').addEventListener('submit', this.addNoteHandler.bind(this));
  }

  addNoteHandler = async (event) => {
    event.preventDefault();
    const title = this.querySelector('#note-title').value.trim();
    const body = this.querySelector('#note-body').value.trim();
    if (!this.validateInput(title, body)) {
      return;
    }
    const newNote = { title, body };
    try {
      await createNote(newNote);
      this.dispatchEvent(new CustomEvent('note-added', { bubbles: true }));
      this.querySelector('#add-note-form').reset();
      // Tampilkan SweetAlert untuk memberi tahu pengguna bahwa catatan berhasil ditambahkan
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: 'Catatan berhasil ditambahkan.',
        showConfirmButton: false,
        timer: 1200
      });
    } catch (error) {
      console.error('Error:', error);
      // Tampilkan SweetAlert untuk menampilkan pesan kesalahan jika terjadi kesalahan saat menambahkan catatan
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat menambahkan catatan.',
      });
    }
    
  }

  validateInput(title, body) {
    const titleError = this.querySelector('#title-error');
    const bodyError = this.querySelector('#body-error');
    let isValid = true;

    // Validasi judul
    if (title === '') {
        titleError.textContent = 'Judul tidak boleh kosong.';
        isValid = false;
    } else if (title.length > 50) {
        titleError.textContent = 'Judul tidak boleh lebih dari 50 karakter.';
        isValid = false;
    } else {
        titleError.textContent = ''; // Kosongkan pesan error jika validasi berhasil
    }

    // Validasi isi catatan
    if (body === '') {
        bodyError.textContent = 'Isi catatan tidak boleh kosong.';
        isValid = false;
    } else {
        bodyError.textContent = ''; // Kosongkan pesan error jika validasi berhasil
    }

    return isValid;
  }
  
}

customElements.define('note-input', NoteInput);
