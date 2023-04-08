export class Modal {
  constructor() {
    this.overlay = document.createElement("div");
    this.overlay.classList.add("overlay");
    this.overlay.classList.add("hidden");

    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.classList.add("hidden");

    this.modal.innerHTML = `
    <div class="header">
      <p class="title">Title</p>
      <button class="close-modal"></button>
    </div>

    <div class="content"></div>
  `;

    this.closeButton = this.modal.querySelector(".close-modal");

    this.overlay.addEventListener("click", () => {
      this.close();
    });
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open({ title, content }) {
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);

    this.modal.querySelector(".title").textContent = title;
    this.modal.querySelector(".content").appendChild(content);

    this.overlay.classList.remove("hidden");
    this.modal.classList.remove("hidden");
  }

  close() {
    this.overlay.classList.add("hidden");
    this.modal.classList.add("hidden");

    this.modal.querySelector(".title").innerHTML = "";
    this.modal.querySelector(".content").innerHTML = "";

    setTimeout(() => {
      document.body.removeChild(this.modal);
      document.body.removeChild(this.overlay);
    }, 150);
  }
}
