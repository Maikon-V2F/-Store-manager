function validarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validarURL(url) {
    var urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(url);
}


function validarForm() {
    var nomeInput = document.getElementById('firstName');
    var sobrenomeInput = document.getElementById('lastName');
    var emailInput = document.getElementById('email');
    var idadeInput = document.getElementById('age');
    var urlInput = document.getElementById("image")

    var nome = nomeInput.value;
    var sobrenome = sobrenomeInput.value;
    var email = emailInput.value;
    var idade = idadeInput.value;
    var url = urlInput.value;

    if (nome === '' || nome.length < 3 || nome.length > 50) {
        
        alert('Erro! O campo nome não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');    
    } else if (sobrenome === '' || sobrenome.length < 3 || sobrenome.length > 50) {
        
        alert('Erro! O campo sobrenome não pode ser vazio, ter menos do que 3 caracteres e mais do que 50 caracteres.');
    } else if (idade < 0 || idade > 120) {
        
        alert('Erro! O campo Idade não pode ser vazio, deve ser maior que 0 e menor que 120 anos.');
    } else if (!validarEmail(email)) {
        
        alert('Erro! O campo email não contém um email válido.');
    }

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
        listItem.innerHTML = `<div class="space"><strong>Nome:</strong> ${user.firstName}</div>
            <div class="space"><strong>Sobrenome:</strong> ${user.lastName}</div>
            <div class="space"><strong>Email:</strong> ${user.email}</div>
            <div class="space"><strong>Idade:</strong> ${user.age || 'N/A'}</div>
            <div class="space"><strong>Foto:</strong> ${user.image ? `<img src="${user.image}" alt="Foto do usuário">` : 'N/A'}</div>
            <button onclick="removeUser(${user.id})" class="remove-btn">
                <i class="bi bi-trash"></i>
            </button>`;
        userList.appendChild(listItem);
    });
}

function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/users";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            // Itera sobre a lista de usuários e cria objetos User
            const arrayDeUsers = users.users; // A API retorna diretamente um array de usuários

            arrayDeUsers.forEach(user => {
                pageUsers.push(new User(user.id, user.firstName, user.lastName, user.email, user.age, user.image));
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
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const image = document.getElementById("image").value;
    // Verifica se o campo de nome não está vazio
    if (firstName.trim() !== "") {
        pageUsers.push(new User(id, firstName, lastName, email, age, image));
        // Limpa o formulário
        addUserForm.reset();
        // Mostra lista de usuários
        displayUsers();
    }
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
    fetchUsers();
});