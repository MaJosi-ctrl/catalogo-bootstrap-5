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
        Material: "coisas",
        dimencoes: "30cm x 25cm"
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
        Material: "isso",
        dimencoes: "20cm x 23cm"
    },
]

/*
Adiciona listeners aos botões "Ver Detalhes" para popular o modal dinamicamente.
*/

const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');

modalElement.addEventListener('show.bs.modal', function (event) {
    
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    if (item) {
        modalTitle.textContent = item.titulo;
    } let deailsHTML = `
    <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary" ${item.categoria}</p>
    <p class="fs-4 fw-bold text-success mb-3">Preco: ${item.preco}</p>
    <hr>
    <p>${item.detalhes}</p>
    `;
});