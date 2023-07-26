document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note");
  const saveBtn = document.getElementById("saveBtn");
  const notesList = document.getElementById("notesList");

  // Завантаження попередньої нотатки з локального сховища (якщо є)
  loadNotes();

  // Збереження нотатки при натисканні кнопки
  saveBtn.addEventListener("click", function () {
    const note = noteInput.value;
    saveNote(note);
  });

  // Функція завантаження всіх нотаток з локального сховища
  function loadNotes() {
    if ('chrome' in window && 'storage' in chrome) {
      // Для Chrome
      chrome.storage.local.get(["notes"], function (result) {
        const notes = result.notes || [];
        renderNotes(notes);
      });
    } else if ('localStorage' in window) {
      // Для Opera та інших браузерів з localStorage
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      renderNotes(notes);
    }
  }

  // Функція збереження нотатки в локальне сховище
  function saveNote(note) {
    if ('chrome' in window && 'storage' in chrome) {
      // Для Chrome
      chrome.storage.local.get(["notes"], function (result) {
        const notes = result.notes || [];
        notes.push(note);
        chrome.storage.local.set({ notes: notes }, function () {
          renderNotes(notes);
          noteInput.value = '';
        });
      });
    } else if ('localStorage' in window) {
      // Для Opera та інших браузерів з localStorage
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes(notes);
      noteInput.value = '';
    }
  }

  // Функція видалення нотатки
  function deleteNote(index) {
    if ('chrome' in window && 'storage' in chrome) {
      // Для Chrome
      chrome.storage.local.get(["notes"], function (result) {
        const notes = result.notes || [];
        notes.splice(index, 1);
        chrome.storage.local.set({ notes: notes }, function () {
          renderNotes(notes);
        });
      });
    } else if ('localStorage' in window) {
      // Для Opera та інших браузерів з localStorage
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes(notes);
    }
  }

  // Функція відображення всіх нотаток у списку
  function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(function (note, index) {
      const listItem = document.createElement("li");
      listItem.textContent = note;


const deleteBtn = document.createElement("button");
deleteBtn.classList.add("IconBut"); // Додаємо клас "IconBut" до кнопки
const deleteIcon = document.createElement("img");
deleteIcon.src = "icons8Trash.png"; // Шлях до вашої картинки
deleteIcon.alt = "Видалити"; // Альтернативний текст (для доступності)
deleteBtn.appendChild(deleteIcon);
deleteBtn.title = "Видалити нотатку"; // Опис кнопки, який відображатиметься при наведенні
deleteBtn.addEventListener("click", function () {
  deleteNote(index);
});


      listItem.appendChild(deleteBtn);
      notesList.appendChild(listItem);
    });
  }
});
