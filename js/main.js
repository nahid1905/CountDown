const nameInput = document.querySelector('#eventInput');
const addBtn = document.querySelector('#addBtn');
const eventList = document.querySelector('.event-list');
const formSubmit = document.querySelector('#formSubmit');
const modal = document.querySelector("#timeModal");
const closeModal = document.querySelector(".close");
const dateInput = document.querySelector('#eventDate');

let editBtn;

let isEdit;
let id = 0;
const items = [];

function render(){
  eventList.innerHTML = "";
  items.forEach(item => {
    let itemDiv = document.createElement('div');
    let itemText = document.createElement('p');
    let timeBtn = document.createElement('i');
    let trashBtn = document.createElement('i');
    let editBtn = document.createElement('i');
    let buttons = document.createElement('div');

    itemDiv.setAttribute('class', 'item');
    itemDiv.setAttribute('id', item.id);
    document.body.appendChild(itemDiv);
    
    itemText.textContent = item.name;
    itemDiv.appendChild(itemText);

    buttons.setAttribute('class', 'buttons');
    itemDiv.appendChild(buttons);

    timeBtn.setAttribute('class', 'fa fa-table');
    timeBtn.setAttribute('id', item.id);
    timeBtn.addEventListener('click', () => showTime(item.id));
    buttons.appendChild(timeBtn);  

    editBtn.setAttribute('class', 'fa fa-edit');
    editBtn.setAttribute('id', item.id);
    editBtn.addEventListener('click', () => editItem(item.id));
    buttons.appendChild(editBtn);  

    trashBtn.setAttribute('class', 'fa fa-trash');
    trashBtn.setAttribute('id', item.id);
    trashBtn.addEventListener('click', () => deleteItem(item.id));
    buttons.appendChild(trashBtn);

    eventList.appendChild(itemDiv);
  });
};

addBtn.addEventListener('click', add);


// create item template
// function createToDoItem(itemId){

//     var now = new Date().getTime();
//     var eventDate = new Date(document.querySelector('#eventDate').value);

//     //   Find the distance between now and the count down date
//     var distance = eventDate - now;
//     console.log(document.querySelector('#eventDate').value);
//     console.log(eventDate);
//     console.log(distance);

//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     document.getElementById('days').innerHTML = days;
//     document.getElementById('hours').innerHTML = hours;
//     document.getElementById('minutes').innerHTML = minutes;
//     document.getElementById('seconds').innerHTML = seconds;

//     // If the count down is finished, write some text
//     if (distance < 0) {
//       clearInterval(x);
//       document.getElementById("countDown").innerHTML = "EXPIRED";
//     }
// }


function add(event){
    event.preventDefault();
    if(!isEdit){
        if(nameInput.value != ''){
            id++;
            let eventItem = {};
            eventItem.id = id;
            eventItem.date = new Date(dateInput.value);
            eventItem.name = nameInput.value;
            items.push(eventItem);
            render();
            nameInput.value = '';
        }
    }
    else{
        if(nameInput.value != ''){
            
            nameInput.value = '';
            isEdit = false;
        }
    }
    isEdit = false;
}
function showTime(id){
    modal.style.display = "block";
    setInterval(function(){
      let modelItem = items.find( i => i.id == id);

      let now = new Date().getTime();
      let eventDate = modelItem.date;
      let distance = eventDate - now;
  
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
  
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.querySelector('.modal-content').textContent = "EXPIRED";
      }
    }, 1000);
}
function deleteItem(id){
    let itemForDelete = items.find(item => item.id == id);
    let itemIndex = items.indexOf(itemForDelete);
    items.splice(itemIndex, 1);
    render();
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
    let item = items.find(x => x.id == id);
    nameInput.value = itemForEdit.textContent;
    editBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(nameInput.value != ''){
            let itemText = itemForEdit.childNodes[0];
            item.name = nameInput.value;
            itemText.textContent = item.name;
            nameInput.value = '';
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