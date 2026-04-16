// --- CONFIGURAÇÃO DO "BANCO DE DADOS" ---
const DB_NAME = "minha_lista_tarefas_v1";

// Tenta carregar do LocalStorage ou inicia vazio
let tarefas = JSON.parse(localStorage.getItem(DB_NAME)) || [];

// Renderizar ao abrir a página
document.addEventListener('DOMContentLoaded', renderizar);

function adicionarTarefa() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priorityInput');

    if (input.value.trim() === "") return alert("Digite algo!");

    const novaTarefa = {
        id: Date.now(),
        texto: input.value,
        prioridade: priority.value,
        concluida: false
    };

    tarefas.push(novaTarefa);
    salvarNoBanco();
    input.value = "";
    renderizar();
}

function alternarStatus(id) {
    tarefas = tarefas.map(t => t.id === id ? {...t, concluida: !t.concluida} : t);
    salvarNoBanco();
    renderizar();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarNoBanco();
    renderizar();
}

function limparBanco() {
    if(confirm("Deseja apagar todos os dados do banco?")) {
        tarefas = [];
        salvarNoBanco();
        renderizar();
    }
}

// SALVAR: Transforma o array em String JSON e guarda no navegador
function salvarNoBanco() {
    localStorage.setItem(DB_NAME, JSON.stringify(tarefas));
}

function renderizar() {
    const lista = document.getElementById('taskList');
    const contador = document.getElementById('counter');
    lista.innerHTML = "";

    tarefas.forEach(t => {
        const li = document.createElement('li');
        li.className = `task-item prio-${t.prioridade} ${t.concluida ? 'done' : ''}`;
        
        li.innerHTML = `
            <div>
                <strong>${t.texto}</strong><br>
                <small>Prioridade: ${t.prioridade}</small>
            </div>
            <div class="actions">
                <button onclick="alternarStatus(${t.id})">✓</button>
                <button class="btn-del" onclick="excluirTarefa(${t.id})">✕</button>
            </div>
        `;
        lista.appendChild(li);
    });

    contador.innerText = `${tarefas.length} tarefas no banco`;
}