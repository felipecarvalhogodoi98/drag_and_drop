// return last id from localstorage
export const getNextId = () => {
  const lastId = JSON.parse(localStorage.getItem("lastId"));

  let nextId = 1;

  if (lastId) {
    nextId = Number(lastId) + 1;
  }

  localStorage.setItem("lastId", nextId);
  return nextId;
};
