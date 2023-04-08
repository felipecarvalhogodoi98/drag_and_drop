import { Modal } from "modal";

export class Card {
  constructor({ id, status, epic, title, description }, board) {
    this.id = id;
    this.status = status;
    this.epic = epic;
    this.title = title;
    this.description = description;
    this.board = board;

    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.setAttribute("draggable", true);
    this.card.dataset.id = id;

    this.card.innerHTML = `
      <div class="epic ${epic}"></div>
      <div class="content">
        <p class="title">${id} - ${title}</p>
        <p class="description">${description}</p>
      </div>
    `;

    this.card.addEventListener("dragstart", this.dragStart.bind(this));

    this.card.addEventListener("drag", this.drag.bind(this));

    this.card.addEventListener("dragend", this.dragEnd.bind(this));

    this.card.addEventListener("dblclick", this.openCardModal.bind(this));

    this.board.columns[status]
      .querySelector(".dropzone")
      .appendChild(this.card);
  }

  openCardModal(e) {
    const modal = new Modal();
    const content = document.createElement("div");
    content.innerHTML = `
      <p class="title">Card ${this.id}</p>
      <p class="description">${this.description}</p>
      <button class="remove-card">Remove</button>
    `;

    const removeButton = content.querySelector(".remove-card");
    removeButton.addEventListener("click", () => {
      this.board.removeCard(this.id);
      this.card.remove();
      modal.close();
    });

    modal.open({
      title: `Card ${this.id}`,
      content,
    });
  }

  dragStart() {
    this.board.dropzones.forEach((dropzone) =>
      dropzone.classList.add("highlight")
    );
    this.card.classList.add("is-dragging");
  }

  drag() {}

  dragEnd() {
    this.board.dropzones.forEach((dropzone) =>
      dropzone.classList.remove("highlight")
    );
    this.card.classList.remove("is-dragging");

    const { id } = this.card.dataset;
    const { column } = this.card.parentElement.parentElement.dataset;

    this.board.updateCard(id, { status: column });
  }
}
