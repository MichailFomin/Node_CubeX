function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
    }

}

function validate(form) {
    var elems = form.elements;

    resetError(elems.name.parentNode);
    if (!elems.name.value) {
        showError(elems.name.parentNode, ' Укажите name.');
    }

    resetError(elems.description.parentNode);
    if (!elems.description.value) {
        showError(elems.description.parentNode, ' Укажите description.');
    }

    resetError(elems.price.parentNode);
    if (!elems.price.value) {
        showError(elems.price.parentNode, ' Укажите, price.');
    }

    resetError(elems.img.parentNode);
    if (!elems.img.value) {
        showError(elems.img.parentNode, ' Отсутствует img.');
    }

}