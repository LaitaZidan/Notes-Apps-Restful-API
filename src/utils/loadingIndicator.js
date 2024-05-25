class LoadingIndicator extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="loading">
          <p>Loading...</p>
        </div>
      `;
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);
  
  export function showLoadingIndicator() {
    document.body.appendChild(document.createElement('loading-indicator'));
  }
  
  export function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  