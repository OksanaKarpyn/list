// let makeList = document.querySelector('.list-make');
// let listDone = document.querySelector('.list-done')
// let i1 = document.querySelector('#input-list');
// let btnForm = document.querySelector('.btn-form');

// //------function-----
// function createMakeListItem(){
//     let inputValue = i1.value.trim();
    
//     let ul = document.createElement('ul');
//     makeList.append(ul);
//     let li = document.createElement('li');
//     li.classList.add('li-make');
//     ul.appendChild(li);
//     let div = document.createElement('div');
//     li.appendChild(div);
//     let input = document.createElement('input');
//     input.type='checkbox';
//     div.appendChild(input);
//     let span = document.createElement('span');
//     span.textContent = `${inputValue}`;
//     div.appendChild(span);
//     let button = document.createElement('button');
//     button.classList.add('btn','btn-light')
//    // button.textContent = '✔fatto';
//     li.appendChild(button);

//         input.addEventListener('change', function(){
//             if (this.checked) {
//                 span.style.textDecoration = 'line-through';
//                 button.textContent = '✔fatto';
//                 button.addEventListener('click',function(){
//                     ul.removeChild(li)
//                     addToDoneList(inputValue);
//                 })
//             } else {
//                 span.style.textDecoration = 'none';
//                 button.textContent = ' ';
//             }
//         })
//         inputValue = '';
// }
// function  addToDoneList(inputValue){
//     let newul = document.createElement('ul');
//     listDone.appendChild(newul);
//     let newli = document.createElement('li');
//     newli.classList.add('li-done');
//     newul.appendChild(newli);
//     let p = document.createElement('p');
//     p.classList.add('lip');
//     p.textContent = `${inputValue}`;
//     newli.append(p);
//     let newbutton = document.createElement('button');
//     newbutton.classList.add('btn','btn-light')
//     newbutton.textContent = '❌delete';
//     newli.append(newbutton);
//     newbutton.addEventListener('click', function(){
//       newul.removeChild(newli);
//    })

// }
// function f1(event){
//     event.preventDefault();
//     let inputValue = i1.value.trim();
//     if (inputValue !== '') {
//         createMakeListItem(inputValue);
//     }
// }
// btnForm.addEventListener('click',f1);




let makeList = document.querySelector('.list-make');
let listDone = document.querySelector('.list-done')
let i1 = document.querySelector('#input-list');
let btnForm = document.querySelector('.btn-form');

// function loadFromLocalStorage() {
//     let storedValues = localStorage.getItem('todoList') || '[]';
//     let todoList = JSON.parse(storedValues);
//     for (let value of todoList) {
//        createMakeListItem(value);
//         addToDoneList(value);
//         // if (value) {
//         //     createMakeListItem(value);
//         // } else {
//         //     addToDoneList(value);
//         // }
//     }
// }
function loadFromLocalStorage() {
    let storedValues = localStorage.getItem('todoList') || '[]';
    let todoList = JSON.parse(storedValues);
    for (let value of todoList) {
        if (value) {
            if (value.startsWith("[DONE]")) {
                // L'elemento è completato
                addToDoneList(value.substring(6)); // Rimuovi "[DONE]" dal valore
            } else {
                // L'elemento non è completato
                createMakeListItem(value);
            }
        }
    }
}

function removeFromLocalStorage(value) {
    let storedValues = localStorage.getItem('todoList') || '[]';
    let todoList = JSON.parse(storedValues);
    const index = todoList.indexOf(value);
    if (index !== -1) {
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
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
               // addToDoneList(inputValue);
                addToDoneList(`[DONE] ${inputValue}`);
                //removeFromLocalStorage(inputValue);
               
            });
        } else {
            span.style.textDecoration = 'none';
            button.textContent = ' ';
        }
    });

    // Pulisci l'input dopo l'aggiunta dell'elemento
    i1.value = '';
    saveToLocalStorage(inputValue);
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
       removeFromLocalStorage(inputValue);
        //saveToLocalStorage();
    });
    saveToLocalStorage();
    //removeFromLocalStorage(inputValue);
}
// Funzione per salvare il valore nella localStorage


function saveToLocalStorage() {
    try{
        let doneItems = Array.from(document.querySelectorAll('.li-done p')).map(item => item.textContent);
        let makeItems = Array.from(document.querySelectorAll('.li-make span')).map(item => item.textContent);
        let allItems = makeItems.concat(doneItems);
        localStorage.setItem('todoList', JSON.stringify(allItems));
    } catch(error){
        console.error('Errore nel salvataggio dei dati nella localStorage:', error);
    }
   
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
loadFromLocalStorage();
//localStorage.clear();




