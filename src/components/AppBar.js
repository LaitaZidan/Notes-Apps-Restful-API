class AppBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <h1>Notes App</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('app-bar', AppBar);
  