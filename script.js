




let makeList = document.querySelector('.list-make');
let listDone = document.querySelector('.list-done')
let i1 = document.querySelector('#input-list');
let btnForm = document.querySelector('.btn-form');
//localstorage 
let savedListDone  = JSON.parse(localStorage.getItem('todoListDone')) || '';

for(const item of savedListDone){
    addToDoneList(item)
}
function saveToLocalStorageDone() {
    // Salva i dati attuali nella lista nel localStorage
    const todoListDone = Array.from( listDone.querySelectorAll('li')).map(li => li.querySelector('p').textContent);
    localStorage.setItem('todoListDone', JSON.stringify(todoListDone));
}


let savedList  = JSON.parse(localStorage.getItem('todoList')) || '';//questo carica dati dal localstorage
// Carica dati salvati nel localStorage
for(const item of savedList){
    createMakeListItem(item);
}
function saveToLocalStorage() {
    // Salva i dati attuali nella lista nel localStorage
    const todoList = Array.from(makeList.querySelectorAll('li')).map(li => li.querySelector('span').textContent);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}


function createMakeListItem(inputValue) {
    let ul = document.createElement('ul');
    makeList.appendChild(ul);
    let li = document.createElement('li');
    li.classList.add('li-make');
    ul.appendChild(li);
    let div = document.createElement('div');
    li.appendChild(div);
    let input = document.createElement('input');
    input.type='checkbox';
    div.appendChild(input);
    let span = document.createElement('span');
    span.textContent = `${inputValue}`;
    div.appendChild(span);
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-light')
    li.appendChild(button);

    input.addEventListener('change', function(){
        if (this.checked) {
            span.style.textDecoration = 'line-through';
            button.textContent = '✔fatto';
            button.addEventListener('click', function(){
                ul.removeChild(li);
              addToDoneList(inputValue);
            
                 saveToLocalStorage();
             
            });
        } else {
            span.style.textDecoration = 'none';
            button.textContent = ' ';
        }
        saveToLocalStorage();
    });

    // Pulisci l'input dopo l'aggiunta dell'elemento
    i1.value = '';
    saveToLocalStorage();
    // saveToLocalStorage(inputValue);
    //removeFromLocalStorage(inputValue);
  
}

function addToDoneList(inputValue) {
    let newul = document.createElement('ul');
    listDone.appendChild(newul);
    let newli = document.createElement('li');
    newli.classList.add('li-done');
    newul.appendChild(newli);
    let p = document.createElement('p');
    p.classList.add('lip');

    p.textContent = inputValue;
  
    newli.append(p);
    let newbutton = document.createElement('button');
    newbutton.classList.add('btn', 'btn-light')
    newbutton.textContent = '❌delete';
    newli.append(newbutton);
    newbutton.addEventListener('click', function(){
        newul.removeChild(newli);
        
        saveToLocalStorageDone(); 
    });
    saveToLocalStorageDone() 
}



function f1(event) {
    event.preventDefault();
    let inputValue = i1.value.trim();
    if (inputValue !== '') {
        createMakeListItem(inputValue);
    }
}


btnForm.addEventListener('click', f1);
 


// Carica i dati dalla localStorage all'avvio dell'app
//loadFromLocalStorage();
//localStorage.clear();




