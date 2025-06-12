let myLibrary = [];
const tbody = document.querySelector('tbody');
const addButton = document.querySelector('.add');
const dialog = document.querySelector('dialog:first-of-type');
const editDialog = document.querySelector('dialog:last-of-type');
const closeButton = document.querySelectorAll('.close');
const submitButton = document.querySelector('button[type="submit"]');

const titleInput = document.querySelector('input[id="title"]');
const authorInput = document.querySelector('input[id="author"]');
const numpagesInput = document.querySelector('input[id="numpages"]');
const havereadInput = document.querySelector('input[id="haveread"]');

function Book(title, author, numberOfPages, haveRead, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numberOfPages, haveRead) {
    let id = crypto.randomUUID()
    let newBook = new Book(title, author, numberOfPages, haveRead, id);
    myLibrary.push(newBook);
    displayBooks(newBook, id);
}

function displayBooks(book, ID) {
    let newRow = document.createElement('tr');

    let trashFill = document.createElement('td');
    trashFill.classList.add('trash-cell');
    let trash = document.createElement('img');
    trash.setAttribute('src', 'img/trash-can.svg');
    trash.setAttribute('alt', 'Delete row');
    trash.classList.add('trash');
    trashFill.append(trash);
    newRow.append(trashFill);


    let title = document.createElement('td');
    title.textContent = book.title;
    newRow.append(title);

    let author = document.createElement('td');
    author.textContent = book.author;
    newRow.append(author);

    let numberOfPages = document.createElement('td');
    numberOfPages.textContent = book.numberOfPages;
    newRow.append(numberOfPages);

    let haveReadCell = document.createElement('td');
    let flexDiv = document.createElement('div');
    flexDiv.classList.add('read');
    let statusDiv = document.createElement('div');
    statusDiv.textContent = book.haveRead;
    let editCell = document.createElement('img');
    editCell.setAttribute('src', 'img/pencil.svg');
    editCell.setAttribute('alt', 'Edit "have read book" status');
    editCell.classList.add('arrow');
    flexDiv.append(statusDiv);
    flexDiv.append(editCell);
    haveReadCell.append(flexDiv);
    newRow.append(haveReadCell);

    let id = document.createElement('td');
    id.textContent = book.id;
    newRow.append(id);

    tbody.append(newRow);

    function editReadStatus() {
        editDialog.showModal();
    }

    function deleteRow() {
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == ID) {
                console.log('ok');
                myLibrary.splice(i, 1);
                newRow.remove();
                trash.removeEventListener('click', deleteRow);
                editCell.removeEventListener('click', editReadStatus);
            }
        }
    }

    trash.addEventListener('click', deleteRow);
    editCell.addEventListener('click', editReadStatus);
}

submitButton.addEventListener('click', (event) => {
    titleText = titleInput.value;
    authorText = authorInput.value;
    numPagesText = numpagesInput.value;
    haveReadText = havereadInput.checked;
    console.log(`${titleText} ${authorText} ${numPagesText} ${haveReadText}`)

    if (titleText !== '' && authorText !== '' && numPagesText !== '') {
        event.preventDefault()
        addBookToLibrary(titleText, authorText, numPagesText, haveReadText);
    }
})


addButton.addEventListener('click', () => {
    dialog.showModal();
});

for (let close of closeButton) {
    close.addEventListener('click', () => {
        dialog.close();
        editDialog.close();
    })
}