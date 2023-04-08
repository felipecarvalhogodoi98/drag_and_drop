import { Card } from "card";
import { getNextId } from "utils";

class Board {
  constructor(id, name) {
    this.board = document.querySelector(".board");
    this.dropzones = document.querySelectorAll(".dropzone");

    this.columns = {};
    document.querySelectorAll(".column").forEach((node) => {
      this.columns[node.dataset.column] = node;
    });

    this.dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragenter", dragEnter);
      dropzone.addEventListener("dragover", dragOver);
      dropzone.addEventListener("dragleave", dragLeave);
      dropzone.addEventListener("drop", drop);
    });

    this.init();
  }

  init() {
    const cards = this.getCards();
    cards.forEach((card) => {
      new Card(card, this);
    });
  }

  getCards() {
    const cards = localStorage.getItem("cards");
    return cards ? JSON.parse(cards) : [];
  }

  addCard({ status, epic, title, description }) {
    const cardObj = {
      id: getNextId(),
      status,
      epic,
      title,
      description,
    };

    const card = new Card(cardObj, this);
    const cards = this.getCards();
    cards.push(card);
    localStorage.setItem("cards", JSON.stringify(cards));
  }

  updateCard(id, data) {
    const cards = this.getCards().map((card) => {
      if (card.id == id) {
        return {
          ...card,
          ...data,
        };
      }
      return card;
    });
    localStorage.setItem("cards", JSON.stringify(cards));
  }

  removeCard(id) {
    const cards = this.getCards().filter((card) => card.id !== id);
    localStorage.setItem("cards", JSON.stringify(cards));
  }
}

export const board = new Board();

function dragEnter() {}

function dragOver(e) {
  this.classList.add("over");

  const cardBeingDragged = document.querySelector(".is-dragging");
  this.appendChild(cardBeingDragged);
}

function dragLeave() {
  this.classList.remove("over");
}

function drop() {
  this.classList.remove("over");
}
