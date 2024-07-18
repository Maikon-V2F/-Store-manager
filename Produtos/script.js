function validarURL(url) {
    var urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(url);
}


function validarForm() {
    var tInput = document.getElementById('title');
    var dInput = document.getElementById('description');
    var pInput = document.getElementById('price');
    var bInput = document.getElementById('brand');
    var cInput = document.getElementById('category');
    var urlInput = document.getElementById("thumbnail")

    var titulo = tInput.value;
    var descricao = dInput.value;
    var preco = pInput.value;
    var marca = bInput.value;
    var categoria = cInput.value;
    var url = urlInput.value;

    if (titulo === '' || titulo.length < 3 || titulo.length > 50) {
        
        alert('Erro! O campo título não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');    
    } else if (descricao === '' || descricao.length < 3 || descricao.length > 50) {
        
        alert('Erro! O campo descrição não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');
    } else if (preco < 0 || preco > 120) {
        
        alert('Erro! O campo preço não pode ser vazio, deve ser maior que 0 e menor que 120.');
    } else if (marca === '' || marca.length < 3 || marca.length > 50) {
        
        alert('Erro! O campo marca não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');}
    
    else if (categoria === '' || categoria.length < 3 || categoria.length > 50) {
        
        alert('Erro! O campo categoria não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');}

    else if (url !== '' && !validarURL(url)) {
        alert('Erro! O campo URL não contém uma URL válida.');
    }

    else {
        addUser();
    }
}


const pageUsers = [];

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Título:</strong> ${user.title}</div>
            <div class="space"><strong>Descrição:</strong> ${user.description}</div>
            <div class="space"><strong>Preço:</strong> ${user.price}</div>
            <div class="space"><strong>Marca:</strong> ${user.brand}</div>
            <div class="space"><strong>Categoria:</strong> ${user.category}</div>
            <div class="space"><strong>Thumbnail:</strong> ${user.thumbnail ? `<img src="${user.thumbnail}" alt="Thumbnail do produto">` : 'N/A'}</div>
            <button onclick="removeUser(${user.id})" class="remove-btn">
                <i class="bi bi-trash"></i>
            </button>`;
        userList.appendChild(listItem);
    });
}

function fetchProducts() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/products";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            // Itera sobre a lista de produtos e cria objetos User
            const arrayDeProducts = products.products; // A API retorna diretamente um array de produtos

            arrayDeProducts.forEach(product => {
                pageUsers.push(new User(product.id, product.title, product.description, product.price, product.brand, product.category, product.thumbnail));
            });

            // Mostra lista de usuários
            displayUsers();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");

    // Obtem os valores do formulário
    const id = pageUsers.length > 0 ? pageUsers[pageUsers.length - 1].id + 1 : 1; // Corrigido o cálculo do ID
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    // Validações
    if (
        title.trim().length < 3 || title.trim().length > 50 ||
        description.trim().length < 3 || description.trim().length > 50 ||
        brand.trim().length < 3 || brand.trim().length > 50 ||
        category.trim().length < 3 || category.trim().length > 50
    ) {
        alert("Os campos título, descrição, marca e categoria devem ter entre 3 e 50 caracteres.");
        return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0 || priceValue >= 120) {
        alert("O campo preço deve ser um número positivo e menor que 120.");
        return;
    }

    // Se todas as validações passarem, adicione o usuário
    pageUsers.push(new User(id, title, description, priceValue, brand, category, thumbnail));
    
    // Limpa o formulário
    addUserForm.reset();
    
    // Mostra lista de usuários
    displayUsers();
}

function removeUser(userId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", userId);
    // Encontrando índice do usuário que vai ser removido
    const userIndexToRemove = pageUsers.findIndex((user) => user.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}

document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchProducts();
});