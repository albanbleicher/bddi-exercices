document.addEventListener('DOMContentLoaded', () => {
let input = document.querySelector('input');
let list = document.querySelector('ul');
let buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click',(e) =>{
        var item = document.createElement('li');
        item.innerText = input.value;
        switch(e.target.getAttribute('class')) {
            case 'add_first': 
            list.prepend(item);
            break;
            case 'add_last': 
            list.append(item);
            break;
            case 'remove_first': 
            list.firstChild ? list.firstChild.remove() : alert('No item to remove');
            break;
            case 'remove_last': 
            list.lastChild ? list.lastChild.remove() : alert('No item to remove');
            break;
        }
    })
})
})