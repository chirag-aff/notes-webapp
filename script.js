// // Get references to HTML elements
// const addNoteBtn = document.querySelector("#add-note-btn");
// const notesList = document.querySelector("#notes-list");

// // Function to create a new note element and add it to the DOM
// function addNote() {
//   // Create new list item and note div
//   const noteItem = document.createElement("li");
//   const noteDiv = document.createElement("div");
//   noteDiv.classList.add("note");

//   // Create title and content elements
//   const titleInput = document.createElement("input");
//   titleInput.type = "text";
//   titleInput.classList.add("note-title");
//   titleInput.placeholder = "Title";

//   const contentInput = document.createElement("textarea");
//   contentInput.classList.add("note-content");
//   contentInput.placeholder = "Note content...";

//   // Create delete button element
//   const deleteBtn = document.createElement("button");
//   deleteBtn.classList.add("delete-note-btn");
//   deleteBtn.textContent = "Delete Note";

//   // Append title, content, and delete button to note div
//   noteDiv.appendChild(titleInput);
//   noteDiv.appendChild(contentInput);
//   noteDiv.appendChild(deleteBtn);

//   // Append note div to list item and list item to notes list
//   noteItem.appendChild(noteDiv);
//   notesList.appendChild(noteItem);

//   // Add event listener to delete button
//   deleteBtn.addEventListener("click", () => {
//     noteItem.remove();
//   });
// }

// // Add event listener to add note button
// addNoteBtn.addEventListener("click", addNote);
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());


//local storage of notes
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");//to get all the otes stored or empty array
}

 //save in the form of string 
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
