const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sFunction = document.querySelector('#m-function')
const sWage = document.querySelector('#m-wage')
const btnSave = document.querySelector('#btnSave')

let items;
let id;


function loadItems() {
    items = getItemsBD()
    tbody.innerHTML = ''
    items.forEach((item, index) => {
        insertItem(item, index)
    });
}


function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>${item.salario}</td>
        <td class="action">
            <button onclick="editItem(${index})" ><i class="bx bx-edit" ></i></button>
        </td>
        <td class="action">  
            <button onclick="deleteItem(${index})" ><i class="bx bx-trash" ></i></button>
        </td>
        `
    tbody.appendChild(tr)
};

function editItem(index) {
    openModal(true, index)
};

function deleteItem(index) {
    items.splice(index, 1)
    setItemsBD()
    loadItems()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sName.value = items[index].nome
        sFunction.value = items[index].funcao
        sWage.value = items[index].salario
        id = index
    } else {
        sName.value = ''
        sFunction.value = ''
        sWage.value = ''
    }
}

btnSave.onclick = e => {
    if (sName.value == '' || sFunction.value == '' || sWage.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        items[id].nome = sName.value
        items[id].funcao = sFunction.value
        items[id].salario = sWage.value
    } else {
        items.push({ 'nome': sName.value, 'funcao': sFunction.value, 'salario': sWage.value })
    }

    setItemsBD()

    modal.classList.remove('active')
    loadItems()
    id = undefined

}

const getItemsBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItemsBD = () => localStorage.setItem('dbfunc', JSON.stringify(items));

loadItems()