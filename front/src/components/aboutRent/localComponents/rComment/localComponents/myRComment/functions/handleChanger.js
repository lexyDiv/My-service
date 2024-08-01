export function handleChanger({ setToDo }) {
  return (e) => {
    setToDo(e.target.innerText);
  };
}
