const books = JSON.parse(localStorage.getItem("books")) || [];

const addBook = (title, author, year, isComplete) => {
  const book = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
};

document
  .getElementById("inputBook")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    addBook(title, author, year, isComplete);

    event.target.reset();
  });

const displayBooks = () => {
  const incompleteBookshelf = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelf = document.getElementById("completeBookshelfList");

  incompleteBookshelf.innerHTML = "";
  completeBookshelf.innerHTML = "";

  for (const book of books) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Penulis: " + book.author;

    const year = document.createElement("p");
    year.textContent = "Tahun: " + book.year;

    const action = document.createElement("div");
    action.classList.add("action");

    const completeButton = document.createElement("button");
    completeButton.classList.add("green");
    completeButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    completeButton.addEventListener("click", function () {
      book.isComplete = !book.isComplete;
      localStorage.setItem("books", JSON.stringify(books));
      displayBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.textContent = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      const confirmation = confirm(
        "Apakah Anda yakin ingin menghapus buku ini?"
      );
      if (confirmation) {
        const index = books.indexOf(book);
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
      }
    });

    const editButton = document.createElement("button");
    editButton.classList.add("blue");
    editButton.textContent = "Edit buku";
    editButton.addEventListener("click", function () {
      const newTitle = prompt("Masukkan judul baru:", book.title);
      const newAuthor = prompt("Masukkan penulis baru:", book.author);
      const newYear = prompt("Masukkan tahun baru:", book.year);

      if (newTitle !== null) book.title = newTitle;
      if (newAuthor !== null) book.author = newAuthor;
      if (newYear !== null) book.year = newYear;

      localStorage.setItem("books", JSON.stringify(books));
      displayBooks();
    });

    action.appendChild(completeButton);
    action.appendChild(editButton);
    action.appendChild(deleteButton);

    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(year);
    bookItem.appendChild(action);

    if (book.isComplete) {
      completeBookshelf.appendChild(bookItem);
    } else {
      incompleteBookshelf.appendChild(bookItem);
    }
  }
};

displayBooks();

document
  .getElementById("searchBook")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const search = document.getElementById("searchBookTitle").value;

    if (!search.trim()) {
      return;
    }

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredBooks.length === 0) {
      alert("Buku tidak ditemukan");
      return;
    } else {
      alert("Buku ditemukan");
    }

    const incompleteBookshelf = document.getElementById(
      "incompleteBookshelfList"
    );
    const completeBookshelf = document.getElementById("completeBookshelfList");

    incompleteBookshelf.innerHTML = "";
    completeBookshelf.innerHTML = "";

    for (const book of filteredBooks) {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");

      const title = document.createElement("h3");
      title.textContent = book.title;

      const author = document.createElement("p");
      author.textContent = "Penulis: " + book.author;

      const year = document.createElement("p");
      year.textContent = "Tahun: " + book.year;

      const action = document.createElement("div");
      action.classList.add("action");

      const completeButton = document.createElement("button");
      completeButton.classList.add("green");
      completeButton.textContent = book.isComplete
        ? "Belum selesai dibaca"
        : "Selesai dibaca";
      completeButton.addEventListener("click", function () {
        book.isComplete = !book.isComplete;
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("red");
      deleteButton.textContent = "Hapus buku";
      deleteButton.addEventListener("click", function () {
        const confirmation = confirm(
          "Apakah Anda yakin ingin menghapus buku ini?"
        );
        if (confirmation) {
          const index = books.indexOf(book);
          books.splice(index, 1);
          localStorage.setItem("books", JSON.stringify(books));
          displayBooks();
        }
      });

      const editButton = document.createElement("button");
      editButton.classList.add("blue");
      editButton.textContent = "Edit buku";
      editButton.addEventListener("click", function () {
        const newTitle = prompt("Masukkan judul baru:", book.title);
        const newAuthor = prompt("Masukkan penulis baru:", book.author);
        const newYear = prompt("Masukkan tahun baru:", book.year);

        if (newTitle !== null) book.title = newTitle;
        if (newAuthor !== null) book.author = newAuthor;
        if (newYear !== null) book.year = newYear;

        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
      });

      action.appendChild(completeButton);
      action.appendChild(editButton);
      action.appendChild(deleteButton);

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(year);
      bookItem.appendChild(action);

      if (book.isComplete) {
        completeBookshelf.appendChild(bookItem);
      } else {
        incompleteBookshelf.appendChild(bookItem);
      }
    }
  });
