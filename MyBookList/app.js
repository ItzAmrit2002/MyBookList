class Book{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    static displayBooks() {
        

        const books = Store.getBooks()

        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book){
        const list = document.querySelector('#books-list');

        const row = document.createElement('tr');


        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
        
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#Author').value = '';
        document.querySelector('#isbn').value = '';

    }
    static showAlert(message, className){
        const div = document.createElement('div')
        // div.className = `alert alert-${className}  alert-dismissible`
        div.innerHTML= '<div class="alert alert-' + className + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        
        // div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static deleteBook(el) {
        console.log(el)
        if(el.classList.contains('delete')){
            if(confirm("Are you sure you want to delete the book?")){
                el.parentElement.parentElement.remove();
                Store.removeBook(el.parentElement.previousElementSibling.textContent)

                UI.showAlert('Book deleted successfully', 'success')
            }
        }
    }
}

class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks()

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))

    }

    static removeBook(isbn){
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e)=> {

    e.preventDefault();
    const title = document.querySelector('#title').value
    const author = document.querySelector('#Author').value
    const isbn = document.querySelector('#isbn').value

    if(title == '' || author == '' || isbn == ''){
        
        UI.showAlert('Please fill in all the fields', 'danger')
        
       
        
        return 
        
    }
    

    const book = new Book(title, author, isbn);

    console.log(book);

    UI.addBookToList(book);
    Store.addBook(book)

    UI.showAlert('Book Added Successfully', 'success')

    UI.clearFields();
})


document.querySelector('#books-list').addEventListener('click', (e)=> {

   
        UI.deleteBook(e.target)
        
       
    
    
})