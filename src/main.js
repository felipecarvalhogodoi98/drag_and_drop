import { Modal } from "modal";
import { board } from "board";

const addCard = document.querySelector(".open-add-card");
const modal = new Modal();

addCard.addEventListener("click", () => {
  const content = document.createElement("div");

  content.innerHTML = `
    <form a>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>
      <div class="form-group">
        <label for="epic">Epic</label>
        <select name="epic" id="epic">
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
      </div>  
      <input type="submit" value="Add card" />
    </form>
  `;

  content
    .querySelector("input[type=submit]")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const title = content.querySelector("[name=title]").value;
      const description = content.querySelector("[name=description]").value;
      const epic = content.querySelector("[name=epic]").value;
      const status = "to-do";

      board.addCard({ title, description, epic, status });
      modal.close();
    });

  modal.open({ title: "Add card", content });
});
