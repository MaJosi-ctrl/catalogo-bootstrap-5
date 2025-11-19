const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "Nada",
        categoria: "Livros",
        detalhes: "Nada",
        preco: "R$ 45,90",
        estoque: 12,
        autor: "Eu",
        lancamento: "2025"
    },
    {
        id: 2,
        titulo: "Uma Coisa",
        categoria: "Artesanato",
        detalhes: " :( ",
        preco: "R$ 100,90",
        estoque: 2,
        material: "coisas",
        dimensoes: "30cm x 25cm"
    },
    {
        id: 3,
        titulo: "sei la",
        categoria: "Livros",
        detalhes: " :D ",
        preco: "R$ 12,90",
        estoque: 10,
        autor: "Eu de novo",
        lancamento: "1978"
    },
    {
        id: 4,
        titulo: "Outra Coisa",
        categoria: "Artesanato",
        detalhes: " :) ",
        preco: "R$ 10,90",
        estoque: 5,
        material: "isso",
        comprimento: "50cm"
    },
]

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});

/*
Adiciona listeners aos botões "Ver Detalhes" para popular o modal dinamicamente.
*/

const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

modalElement.addEventListener('show.bs.modal', function (event) {
    
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    
    if (item) {
        
        modalTitle.textContent = item.titulo;
        
        let deailsHTML = `
            <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
            <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
            <hr>
            <p>${item.detalhes}</p>
            `;
        
        if (item.categoria === 'Livros') {
            deailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            deailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            deailsHTML += `<p class="text-info"><strong>Estoque Disponível:</strong> ${item.estoque}</p>`;
        } else if (item.categoria === 'Artesanato') {
            deailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            deailsHTML += `<p><strong>Dimensões/Comprimento:</strong> ${item.dimensoes || item.comprimento}</p>`;
            deailsHTML += `<p class="text-info"><strong>peças Exclusivas em Estoque:</strong> ${item.estoque}</p>`;
        }
        
        modalBody.innerHTML = deailsHTML;
        
        modalAction.onclick = () => {

            adicionarItemCarrinho(item.id);
            console.log(`Ação: Item '${item.titulo}' (ID: ${item.id}) adicionado ao carrinho.`);
            
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
        
    }
});

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    event.preventDefault();
    
    const query = searchInput.value.toLowerCase().trim();
    
    items.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        if (title.includes(query) || category.includes(query) || query === "") {
            item.style.display = 'block';
        } else {
            item.style.display ='none';
        }
    });
}

searchButton.addEventListener('click', executarPesquisa);

searchInput.addEventListener('keyup', (event) => {
    
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim() === "") {
        
        executarPesquisa(event);
    }
});


items.forEach ((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));
    
    if (item) {
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        
        title.textContent = item.titulo;
        
        category.textContent = "Categoria: " + item.categoria;
        
        description.textContent = item.detalhes;
    }
});

const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoDoNavegador() {
    
    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.");
    }
    
    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
        
    } catch (e) {
        console.error("ERRO: Falha ao salvar carrinho no navegador. Erro:", e);
    }
}

function atualizarContadorCarrinho() {
    const carrinho = obterCarrinhoDoNavegador();
    
    const carrinhoBadge = document.getElementById("cart-count");
    
    if (carrinhoBadge) {
        carrinhoBadge.textContent =carrinho.length;
        
        if (carrinho.length > 0) {
            carrinhoBadge.classList.remove('d-none');
            
        } else {
            carrinhoBadge.classList.add('d-none')
            
        }
    }
}


function adicionarItemCarrinho(itemId) {
    
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId);
    salvarCookieCarrinho(carrinho);
    atualizarContadorCarrinho();
}

atualizarContadorCarrinho();

const carrinho_btn = document.getElementById("cart-button");

carrinho_btn.addEventListener("click", function() {

    const carrinho_secao = document.getElementById("card_section");
    carrinho_secao.classList.toggle("d-none");

    if (carrinho_secao.classList.contains("d-none")) {
        return;
    }

    const carrinho_recibo = document.getElementById("cart-list");
    carrinho_recibo.innerHTML ="";
    
    const itensCarrinho = obterCarrinhoDoNavegador();

    itensCarrinho.forEach(itemId => {
        const li = document.createElement("li");

        const item = CATALOG_ITEMS.find(i => i.id === itemId);
        li.innerHTML = item.titulo;
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
        <div>
            <h6 class="mb-1">${item.titulo}</h6>
        </div>
        <span class="fw-bold text-success">${formatCurrency(item.preco)}</span>
        `;

        carrinho_recibo.appendChild(li);
    });
});