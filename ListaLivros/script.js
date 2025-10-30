// Books Management App with Alpine.js
function booksApp() {
    return {
        // State Management
        books: [],
        newBook: {
            id: null,
            title: '',
            author: ''
        },
        editingBook: null,
        showNewBookModal: false,
        showStockModal: false,
        isLoading: false,
        message: {
            show: false,
            type: '',
            text: ''
        },

        // Initialize app
        init() {
            this.loadBooks();
            this.initializeBackground();
            console.log('📚 LionBook - Books Management System initialized');
        },

        // Initialize background same as login page
        initializeBackground() {
            const img = new Image();
            img.onload = () => {
                console.log('✅ Background image loaded successfully');
            };
            img.onerror = () => {
                console.log('📷 Background image not found - using CSS gradient fallback');
            };
            img.src = '../img/image.png';
        },

        // Simulate database data loading
        loadBooks() {
            this.isLoading = true;
            
            // Simulate API call delay
            setTimeout(() => {
                this.books = [
                    {
                        id: 120,
                        title: 'A Volta ao Mundo em 80 Dias',
                        author: 'Júlio Verne',
                        isDeleted: false
                    },
                    {
                        id: 456,
                        title: 'O velho e o menino',
                        author: 'Ernest Hemingway',
                        isDeleted: false
                    },
                    {
                        id: 987,
                        title: 'As coisas que você só vê quando desacelera',
                        author: 'Haemin Sunim',
                        isDeleted: false
                    },
                    {
                        id: 321,
                        title: 'O Homem que Calculava',
                        author: 'Malba Tahan',
                        isDeleted: false
                    }
                ];
                this.isLoading = false;
                this.showMessage('success', 'Dados carregados com sucesso!');
            }, 1000);
        },

        // Modal Management
        openNewBookModal() {
            this.resetForm();
            this.showNewBookModal = true;
        },

        closeNewBookModal() {
            this.showNewBookModal = false;
            this.editingBook = null;
            this.resetForm();
        },

        openStockModal() {
            this.showStockModal = true;
        },

        closeStockModal() {
            this.showStockModal = false;
        },

        // Form Management
        resetForm() {
            this.newBook = {
                id: null,
                title: '',
                author: ''
            };
        },

        // CRUD Operations
        saveBook() {
            if (!this.newBook.title.trim()) {
                this.showMessage('error', 'O título do livro é obrigatório!');
                return;
            }

            if (this.editingBook) {
                this.updateBook();
            } else {
                this.createBook();
            }
            
            this.closeNewBookModal();
        },

        createBook() {
            const newId = Math.max(...this.books.map(b => b.id), 0) + 1;
            
            const book = {
                id: newId,
                title: this.newBook.title.trim(),
                author: this.newBook.author.trim() || 'Autor não informado',
                isDeleted: false
            };

            // Simulate API call
            this.isLoading = true;
            
            setTimeout(() => {
                this.books.push(book);
                this.isLoading = false;
                this.showMessage('success', `Livro "${book.title}" adicionado com sucesso!`);
            }, 500);
        },

        editBook(book) {
            this.editingBook = book;
            this.newBook = {
                id: book.id,
                title: book.title,
                author: book.author
            };
            this.showNewBookModal = true;
        },

        updateBook() {
            const book = this.books.find(b => b.id === this.editingBook.id);
            
            if (book) {
                // Simulate API call
                this.isLoading = true;
                
                setTimeout(() => {
                    book.title = this.newBook.title.trim();
                    book.author = this.newBook.author.trim() || 'Autor não informado';
                    this.isLoading = false;
                    this.showMessage('success', `Livro "${book.title}" atualizado com sucesso!`);
                }, 500);
            }
        },

        deleteBook(book) {
            if (confirm(`Tem certeza que deseja excluir o livro "${book.title}"?`)) {
                // Simulate API call
                this.isLoading = true;
                
                setTimeout(() => {
                    // Soft delete - mark as deleted instead of removing from array
                    book.isDeleted = true;
                    this.isLoading = false;
                    this.showMessage('success', `Livro "${book.title}" excluído com sucesso!`);
                }, 500);
            }
        },

        // Utility Functions
        showMessage(type, text) {
            this.message = {
                show: true,
                type: type,
                text: text
            };

            // Auto hide after 4 seconds
            setTimeout(() => {
                this.message.show = false;
            }, 4000);
        },

        // Computed Properties
        get activeBooks() {
            return this.books.filter(book => !book.isDeleted);
        },

        get totalBooks() {
            return this.activeBooks.length;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    setTimeout(() => {
        document.querySelector('.header').style.animation = 'fadeInUp 0.6s ease-out';
        document.querySelector('.action-buttons').style.animation = 'fadeInUp 0.6s ease-out 0.2s both';
        document.querySelector('.table-container').style.animation = 'fadeInUp 0.6s ease-out 0.4s both';
    }, 100);

    // Handle escape key for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const app = Alpine.store('app');
            if (app && (app.showNewBookModal || app.showStockModal)) {
                app.showNewBookModal = false;
                app.showStockModal = false;
            }
        }
    });

    console.log('🦁 LionBook application loaded successfully!');
});
