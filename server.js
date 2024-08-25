let books = [];

// Function to display books in the list
function displayBooks() {
    const bookList = document.getElementById('bookList');
    const searchQuery = document.getElementById('searchQuery').value.toLowerCase();

    // Clear the current list
    bookList.innerHTML = '';

    // Filter and display the books based on the search query
    books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
    }).forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
            </div>
            <div class="book-file">
                <a href="#" download="${book.file}">${book.file}</a>
            </div>
        `;
        bookList.appendChild(li);
    });
}

// Function to handle form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const file = document.getElementById('file').files[0];

    // Log the input data to the console
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('File:', file);

    // Create a FormData object to send the data to the server
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('file', file);

    // Send the form data to the backend server
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server response
        console.log('Server response:', data);
        alert('Book uploaded successfully!');

        // Optionally add the new book to the local list
        books.push({ title, author, file: file.name }); // Use the file name instead of the file object

        // Clear the form inputs
        document.getElementById('uploadForm').reset();

        // Display the updated list of books
        displayBooks();
    })
    .catch(error => {
        console.error('Error uploading book:', error);
    });
});

// Function to filter books as you type in the search bar
document.getElementById('searchQuery').addEventListener('input', function() {
    displayBooks();
});
