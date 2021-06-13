/* variables */
const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear')

/*event listeners*/

// add item
submit.addEventListener('click', addItem);
// remove item
list.addEventListener('click', removeItem);
// display local storage
document.addEventListener('DOMContentLoaded', displayStorage)
// remove all items
clear.addEventListener('click', removeItems);





/* functions */
function addItem(event) {
 event.preventDefault();
 let value = input.value;
 if (value === '') {
  showAction(addItemsAction, 'Please add grocery item', false)

 } else {
  showAction(addItemsAction, `${value} added to the list`, true);
  createItem(value);
  updateStorage(value);

 }
}

// success or alert

function showAction(element, text, value) {
 if (value === true) {
  element.classList.add('success');
  element.innerText = text;
  input.value = '';
  setTimeout(function () {
   element.classList.remove('success')
  }, 3000)
 } else {
  element.classList.add('alert');
  element.innerText = text;
  input.value = '';
  setTimeout(function () {
   element.classList.remove('alert')
  }, 3000)
 }
}

// create item

function createItem(value) {
 let parent = document.createElement('div');
 parent.classList.add('grocery-item');
 // first append to list 

 // let title = document.createElement('h4');
 //  title.classList.add('grocery-item__title');
 //  title.innerText = value;
 //  parent.appendChild(title);

 parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
     <i class="far fa-trash-alt"></i>
    </a>`;

 // append to list 
 list.appendChild(parent)
}


// update local  storage
function updateStorage(value) {
 // localStorage.clear()
 let groceryList;
 let exists = localStorage.getItem('groceryList');
 // console.log(exists);
 groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : []
 // if (exists) {
 //  groceryList = JSON.parse(localStorage.groceryItem('groceryList'))
 // }
 // else {
 //  groceryList = []
 // }

 groceryList.push(value);
 localStorage.setItem('groceryList', JSON.stringify(groceryList))
}


// display local storage 
function displayStorage() {
 let exists = localStorage.getItem('groceryList');

 if (exists) {
  let storageItems = JSON.parse(localStorage.getItem('groceryList'));
  storageItems.forEach(function (element) {
   createItem(element)
  })
 }
}

// edit storage
function editStorage(item) {

 let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
 console.log(groceryItems);

 let index = groceryItems.indexOf(item);
 console.log(index);
 groceryItems.splice(index, 1);
 console.log(groceryItems);

 localStorage.removeItem('groceryList');
 localStorage.setItem('groceryList', JSON.stringify(groceryItems))

}


//remove single item 
function removeItem(e) {
 e.preventDefault();
 // console.log(e.target);
 // console.log(e.target.parentElement.parentElement);
 let link = e.target.parentElement;
 if (link.classList.contains('grocery-item__link')) {
  let text = link.previousElementSibling.innerHTML;
  let groceryItem = e.target.parentElement.parentElement;
  // remove from storage
  editStorage(text);
  // remove from list
  list.removeChild(groceryItem);
  showAction(displayItemsAction, `${text} removed from the list`, true);
 }
}


// remove all items
function removeItems() {
 // delete from local storage
 localStorage.removeItem('groceryList');

 // delete from UI
 let items = document.querySelectorAll('.grocery-item');
 // console.log(items);

 if (items.length > 0) {
  showAction(displayItemsAction, 'All items deleted', false);

  items.forEach(function (e) {
   list.removeChild(e);
  })
 } else {
  showAction(displayItemsAction, 'no more items to delete', true);
 }

}