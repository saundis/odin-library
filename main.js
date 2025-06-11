const myLibrary = [];
const tbody = document.querySelector('tbody');
const button = document.querySelector('button');

function Book(title, author, numberOfPages, haveRead, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numberOfPages, haveRead) {
    let newBook = new Book(title, author, numberOfPages, haveRead, crypto.randomUUID());
    myLibrary.push(newBook);
}

function displayBooks() {
    for (let book of myLibrary) {
        let newRow = document.createElement('tr');

        let id = document.createElement('td');
        id.textContent = book.id;
        newRow.append(id);

        let title = document.createElement('td');
        title.textContent = book.title;
        newRow.append(title);

        let author = document.createElement('td');
        author.textContent = book.author;
        newRow.append(author);

        let numberOfPages = document.createElement('td');
        numberOfPages.textContent = book.numberOfPages;
        newRow.append(numberOfPages);

        let haveRead = document.createElement('td');
        haveRead.textContent = book.haveRead;
        newRow.append(haveRead);

        tbody.append(newRow);
    }
}

addBookToLibrary('test', 'The Tester', 20, false);
displayBooks();