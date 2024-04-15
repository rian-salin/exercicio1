window.onload = function() {
    addTarefasDoLocalStorage();
};

function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
    salvanolocalstorage()
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas   = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)
}


function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
        salvanolocalstorage();
    }    
}

//função  para excluir tarefas realizadas 


function apagarTarefasRealizadas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');

    tarefas.forEach(tarefa => {
        const checkbox = tarefa.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            listaTarefas.removeChild(tarefa);
        }
    });
}

// função para editar o nome da tarefa 

function editarNomeTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    
    const textoAtual = tarefaSelecionada.innerText;
    const novoNome = prompt("Digite o novo nome da tarefa:", textoAtual);

    if (novoNome !== null && novoNome !== "") {
        tarefaSelecionada.innerText = novoNome;
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const listaTarefas = document.getElementById('lista_de_tarefas');

    listaTarefas.addEventListener('dblclick', function(event) {
       
        const elementoClicado = event.target;//obtém o conteudo que foi clicado

        if (elementoClicado.tagName === 'LI') {
            editarNomeTarefa(elementoClicado.id);
            salvanolocalstorage();
        }
    });
});


// salva lista de tarefas no localStorage
function salvarListaNoLocalStorage() {
    const listaTarefas = document.getElementById('lista_de_tarefas').innerHTML;
    localStorage.setItem('lista_tarefas', listaTarefas);
}

// add lista de tarefas do localStorage
function addListaDoLocalStorage() {
    const listaSalva = localStorage.getItem('lista_tarefas');
    if (listaSalva) {
        document.getElementById('lista_de_tarefas').innerHTML = listaSalva;
        configurarListeners(); 
    }
}


function configurarListeners() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    listaTarefas.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            salvanolocalstorage();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    carregarListaDoLocalStorage(); 
    configurarListeners(); 
});

//

function salvanolocalstorage() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');
    const tarefasArray = [];

    tarefas.forEach(tarefa => {
        tarefasArray.push({
            id: tarefa.id,
            texto: tarefa.innerText,
            concluida: tarefa.style.textDecoration === 'line-through'
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
}

function addTarefasDoLocalStorage() {
    const tarefasArray = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasArray.forEach(tarefa => {
        criaNovoItemDaLista(tarefa.texto);
        const tarefaElement = document.getElementById(tarefa.id);
        if (tarefa.concluida) {
            tarefaElement.style.textDecoration = 'line-through';
        }
    });
}





