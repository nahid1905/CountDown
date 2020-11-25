const input = document.querySelector('#eventInput');
const addBtn = document.querySelector('#addBtn');
const toDo = document.querySelector('.to-do-list');
const allToDoItems = document.querySelectorAll('.to-do-list .item');
const formSubmit = document.querySelector('#formSubmit');
const modal = document.querySelector("#timeModal");
const closeModal = document.getElementsByClassName("close");

let editBtn;

let isEdit;
let id = 0;
const items = [];


addBtn.addEventListener('click', add);


// create item template
function createToDoItem(itemId){
    let item = document.createElement('div');
    let itemText = document.createElement('p');
    let timeBtn = document.createElement('i');
    let trashBtn = document.createElement('i');
    let editBtn = document.createElement('i');
    let buttons = document.createElement('div');
    
    item = document.body.appendChild(item);
    item.setAttribute('class', 'item');
    item.setAttribute('id', itemId);
    
    itemText = item.appendChild(itemText);
    itemText.textContent = input.value;

    buttons = item.appendChild(buttons);
    buttons.setAttribute('class', 'buttons');

    timeBtn.setAttribute('class', 'fa fa-table');
    timeBtn.setAttribute('id', itemId);
    timeBtn.addEventListener('click', () => showTime(itemId));
    timeBtn = buttons.appendChild(timeBtn);  

    editBtn.setAttribute('class', 'fa fa-edit');
    editBtn.setAttribute('id', itemId);
    editBtn.addEventListener('click', () => editItem(itemId));
    editBtn = buttons.appendChild(editBtn);  

    trashBtn.setAttribute('class', 'fa fa-trash');
    trashBtn.setAttribute('id', itemId);
    trashBtn.addEventListener('click', () => deleteItem(itemId));
    trashBtn = buttons.appendChild(trashBtn);

    

    var now = new Date().getTime();
    var eventDate = new Date(document.querySelector('#eventDate').value);

    //   Find the distance between now and the count down date
  var distance = eventDate - now;
    console.log(document.querySelector('#eventDate').value);
  console.log(eventDate);
    console.log(distance);

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  // document.getElementById("countDown").innerHTML = days + "day " + hours + "hours "
  // + minutes + "minutes " + seconds + "seconds";
  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countDown").innerHTML = "EXPIRED";
  }
    

    toDo.appendChild(item);
}


function add(){
    event.preventDefault();
    if(!isEdit){
        if(input.value != ''){
            id++;
            createToDoItem(id);
            input.value = '';
        }
    }
    else{
        if(input.value != ''){
            
            input.value = '';
            addBtn.value = 'Add';
            isEdit = false;
        }
    }
    isEdit = false;
}
function showTime(id){
    modal.style.display = "block";
}
function deleteItem(id){
    let itemForDelete = document.getElementById(id);
    itemForDelete.remove();
}
function editItem(id){
    if(!editBtn){
        editBtn = document.createElement('input');
        editBtn = formSubmit.appendChild(editBtn);
        editBtn.setAttribute('id', 'edit');
        editBtn.setAttribute('type', 'submit')
        editBtn.value = "Save";
        addBtn.disabled = true;
    }
    let itemForEdit = document.getElementById(id);
    input.value = itemForEdit.textContent;
    editBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(input.value != ''){
            let itemText = itemForEdit.childNodes[0];
            itemText.textContent = input.value;
            input.value = '';
            editBtn.remove();
            editBtn = null;
            addBtn.disabled = false;
        }
    })
}
function complete(id){
    let itemForComplete = document.getElementById(id);
    itemForComplete.classList.add('completed');
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Update the count down every 1 second
// var x = setInterval(function() {

// }, 1000);