let inputName = document.getElementById("inputName");
let inputPhone = document.getElementById("inputPhone");
let submit = document.getElementById("submit");
let output = document.getElementById('output');
var contact = document.createElement('div');
let count = 0;
let users = [];

submit.addEventListener("click", function () {
    if (inputName.value == "" || inputPhone.value == "") {
        alert("Пожалуйста, введите имя или телефон");
    } else {
        CreateContact();
    }
})


output.onclick = function (event) {
    let target = event.target.textContent;
    let targetParent = event.target.parentNode.parentNode.id;
    let targetParentChildrenName = event.target.parentNode.parentNode.childNodes[1];
    let targetParentChildrenPhone = event.target.parentNode.parentNode.childNodes[3];
    switch (target) {
        case 'delete':
            let del = document.getElementById(`${targetParent}`);
            console.log(targetParent)
            del.classList.add("destroy");
            setTimeout(function () {
                users.splice(targetParent, 1);
                updateLocal();
                del.remove();
            }, 900);
            break;
        case 'edit':
            targetParentChildrenName.classList.add("edit");
            targetParentChildrenPhone.classList.add("edit");
            targetParentChildrenName.contentEditable = true;
            targetParentChildrenPhone.contentEditable = true;
            event.target.textContent = 'save';
            break;
        case 'save':
            console.log(targetParent)
            targetParentChildrenName.classList.remove("edit");
            targetParentChildrenPhone.classList.remove("edit");
            targetParentChildrenName.contentEditable = false;
            targetParentChildrenPhone.contentEditable = false;
            users[targetParent].name = targetParentChildrenName.textContent;
            users[targetParent].phone = targetParentChildrenPhone.textContent;
            event.target.textContent = 'edit';
            updateLocal()
            break;
        default:
            return false;
    }
};

class Contacts {
    constructor(object) {
        this.id = object.id;
        this.name = object.name;
        this.phone = object.phone;
    }
}

function CreateContact() {
    var str = `<div class='grid-container' id='${count}'>
    <div class="name" contenteditable="false">${inputName.value}</div>
    <div class="phone" contenteditable="false">${inputPhone.value}</div>
    <div class="btn-edit"><button>edit</button></div>
    <div class="btn-del"><button>delete</button></div>
    </div>`;
    contact.innerHTML = str + contact.innerHTML;

    let user = new Contacts({
        id: count,
        name: inputName.value,
        phone: inputPhone.value,
    })
    count++;
    output.append(contact)
    users.push(user);
    inputName.value = "";
    inputPhone.value = "";
    updateLocal()
}

function updateLocal() {
    localStorage.setItem('storedUsers', JSON.stringify(users));
}

function init() {
    if (localStorage.getItem('storedUsers')) {
        users = JSON.parse(localStorage.getItem('storedUsers'));
    }

    users.sort(function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    });

    for (var i = 0; i < users.length; i++) {
        var str = `<div class='grid-container' id='${users[i].id}'>
    <div class="name" contenteditable="false">${users[i].name}</div>
    <div class="phone" contenteditable="false">${users[i].phone}</div>
    <div class="btn-edit"><button>edit</button></div>
    <div class="btn-del"><button>delete</button></div>
    </div>`;
        contact.innerHTML = str + contact.innerHTML;

        let user = new Contacts({
            id: users[i].id,
            name: users[i].name,
            phone: users[i].phone,
        })
        count = users.length;
        output.append(contact)
    }
}

init();