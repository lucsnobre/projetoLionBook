// Books Management App with Alpine.js
const API_BASE_URL = 'http://localhost:3000';

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

        // Load books from API
        async loadBooks() {
            this.isLoading = true;
            
            try {
                const response = await fetch(`${API_BASE_URL}/livros`);
                const result = await response.json();
                
                if (result.status === 'OK') {
                    this.books = result.data.map(book => ({
                        ...book,
                        isDeleted: false
                    }));
                    this.showMessage('success', 'Dados carregados com sucesso!');
                } else {
                    throw new Error(result.message || 'Erro ao carregar livros');
                }
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
                this.showMessage('error', 'Erro ao carregar livros. Verifique se o servidor está funcionando.');
                this.books = [];
            } finally {
                this.isLoading = false;
            }
        },

        // Navigation
        openNewBookModal() {
            // Redireciona para a tela de cadastro
            window.location.href = '../cadastro/index.html';
        },

        closeNewBookModal() {
            this.showNewBookModal = false;
            this.editingBook = null;
            this.resetForm();
        },

        openStockModal() {
            // Redireciona para a tela de estoque
            window.location.href = '../estoque/index.html';
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

        async createBook() {
            this.isLoading = true;
            
            try {
                const bookData = {
                    title: this.newBook.title.trim(),
                    author: this.newBook.author.trim() || 'Autor não informado',
                    isbn: '', // Pode ser adicionado ao formulário depois
                    quantidade: 1 // Quantidade padrão
                };
                
                const response = await fetch(`${API_BASE_URL}/livros`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });
                
                const result = await response.json();
                
                if (result.status === 'OK') {
                    // Recarregar a lista de livros
                    await this.loadBooks();
                    this.showMessage('success', `Livro "${bookData.title}" adicionado com sucesso!`);
                } else {
                    throw new Error(result.message || 'Erro ao criar livro');
                }
            } catch (error) {
                console.error('Erro ao criar livro:', error);
                this.showMessage('error', 'Erro ao adicionar livro. Tente novamente.');
            } finally {
                this.isLoading = false;
            }
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

        async updateBook() {
            this.isLoading = true;
            
            try {
                const bookData = {
                    title: this.newBook.title.trim(),
                    author: this.newBook.author.trim() || 'Autor não informado'
                };
                
                const response = await fetch(`${API_BASE_URL}/livros/${this.editingBook.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });
                
                const result = await response.json();
                
                if (result.status === 'OK') {
                    // Recarregar a lista de livros
                    await this.loadBooks();
                    this.showMessage('success', `Livro "${bookData.title}" atualizado com sucesso!`);
                } else {
                    throw new Error(result.message || 'Erro ao atualizar livro');
                }
            } catch (error) {
                console.error('Erro ao atualizar livro:', error);
                this.showMessage('error', 'Erro ao atualizar livro. Tente novamente.');
            } finally {
                this.isLoading = false;
            }
        },

        async deleteBook(book) {
            if (confirm(`Tem certeza que deseja excluir o livro "${book.title}"?`)) {
                this.isLoading = true;
                
                try {
                    const response = await fetch(`${API_BASE_URL}/livros/${book.id}`, {
                        method: 'DELETE'
                    });
                    
                    const result = await response.json();
                    
                    if (result.status === 'OK') {
                        // Recarregar a lista de livros
                        await this.loadBooks();
                        this.showMessage('success', `Livro "${book.title}" excluído com sucesso!`);
                    } else {
                        throw new Error(result.message || 'Erro ao excluir livro');
                    }
                } catch (error) {
                    console.error('Erro ao excluir livro:', error);
                    this.showMessage('error', 'Erro ao excluir livro. Tente novamente.');
                } finally {
                    this.isLoading = false;
                }
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
