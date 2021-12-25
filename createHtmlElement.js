'use strict';

// creates a new html element, attributes is an object
const createHtmlElement = (parentElement, targetElement, content, attributes) => {
    let createdElem = document.createElement(targetElement);
    if (targetElement == 'input') {
        createdElem.value = content;
    } else {
        createdElem.textContent = content;
    }
    if (attributes) {
        let keysArray = Object.keys(attributes);
        let index = 0;
        while (index < keysArray.length) {
            createdElem.setAttribute(keysArray[index], attributes[keysArray[index]]);
            index++;
        }
    }
    return parentElement.appendChild(createdElem);
}
 
export {createHtmlElement}; 
