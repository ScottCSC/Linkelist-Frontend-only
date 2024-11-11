const linkedListDisplay = document.getElementById('linkedListDisplay');
let linkedList = [];

// Inicializar Sortable.js con efectos adicionales
Sortable.create(linkedListDisplay, {
    animation: 200,
    onStart: function (evt) {
        evt.item.classList.add('dragging'); // Agrega la clase al iniciar el arrastre
    },
    onEnd: function (evt) {
        evt.item.classList.remove('dragging'); // Quita la clase al terminar el arrastre
        updateListOrder();
    }
});

function addNode() {
    const nodeValue = document.getElementById('nodeValue').value.trim();
    const positionValue = parseInt(document.getElementById('positionValue').value);

    if (nodeValue === '') {
        alert('Por favor, ingrese un valor para el nodo.');
        return;
    }

    if (!isNaN(positionValue) && positionValue >= 0 && positionValue <= linkedList.length) {
        linkedList.splice(positionValue, 0, nodeValue);
    } else {
        linkedList.push(nodeValue);
    }

    document.getElementById('nodeValue').value = '';
    document.getElementById('positionValue').value = '';
    renderList();
}

function removeNode(index) {
    linkedList.splice(index, 1);
    renderList();
}

function renderList() {
    linkedListDisplay.innerHTML = '';
    linkedList.forEach((value, index) => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerText = value;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = () => removeNode(index);
        nodeElement.appendChild(deleteButton);

        linkedListDisplay.appendChild(nodeElement);
    });
}

function updateListOrder() {
    const reorderedList = [];
    const nodes = document.querySelectorAll('#linkedListDisplay .node');
    nodes.forEach(node => {
        reorderedList.push(node.childNodes[0].nodeValue.trim());
    });
    linkedList = reorderedList;
}
