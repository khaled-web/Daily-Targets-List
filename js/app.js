/* variables */
const addItemsAction = document.querySelector('.addItems-action');
const addItemsInput = document.querySelector('.addItem-input');
const addItemsSubmit = document.querySelector('.addItems-submit');

const displayItemsAction = document.querySelector('.displayItems-action');
const targetList = document.querySelector('.targetList');
const displayItemsClear = document.querySelector('.displayItems-clear');


/* EventListener */
addItemsSubmit.addEventListener('click', (e) => {
 e.preventDefault();
 let value = addItemsInput.value;
 if (value === '') {
  showAction(addItemsAction, 'Please add your target', false);
 } else {
  showAction(addItemsAction, `${value}added to the list`, true);
 }
});


/* Show Action */
const showAction = (element, text, value) => {
 if (value === true) {
  element.classList.add('success');
  element.innerText = text;
  addItemsInput.value = '';
  setTimeout(function () {
   element.classList.remove('success');
  }, 3000);

 } else {

  element.classList.add('alert');
  element.innerText = text;
  addItemsInput.value = '';
  setTimeout(() => {
   element.classList.remove('alert');
  }, 3000);
 }
}