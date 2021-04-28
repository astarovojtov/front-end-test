let inputName = document.getElementById("inputName");
let inputPhone = document.getElementById("inputPhone");
let submit = document.getElementById("submit");
let output = document.getElementById('output');
var contact = document.createElement('div');
let count = 0;
let checked = false;
let edited = false;
let users = [];

submit.addEventListener("click", function () {
    Check();
    CreateContact();
});

function Check(name, phone) {
    if (edited === true) {
        let controlName = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
        let controlPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (name == "" || phone == "") {
            alert("Пожалуйста, введите имя или телефон");
            return false;
        };
        if (!controlName.test(name)) {
            alert('Имя не соответствует');
            return false;
        };
        if (!controlPhone.test(phone)) {
            alert('Телефон не соответствует');
            return false;
        };
        if (users.length != 0) {
            let userIndex = users.findIndex(user => user.phone === phone)
            if (userIndex != -1) {
                alert('Телефон уже существует');
                return false;
            };
        }
        checked = true;
    } else {
        let controlName = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
        let controlPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (inputName.value == "" || inputPhone.value == "") {
            alert("Пожалуйста, введите имя или телефон");
            return false;
        };
        if (!controlName.test(inputName.value)) {
            alert('Имя не соответствует');
            return false;
        };
        if (!controlPhone.test(inputPhone.value)) {
            alert('Телефон не соответствует');
            return false;
        };
        if (users.length != 0) {
            let userIndex = users.findIndex(user => user.phone === inputPhone.value)
            if (userIndex != -1) {
                alert('Телефон уже существует');
                return false;
            };
        }

        checked = true;
    }
}


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
            edited = true;
            targetParentChildrenName.classList.add("edit");
            targetParentChildrenPhone.classList.add("edit");
            targetParentChildrenName.contentEditable = true;
            targetParentChildrenPhone.contentEditable = true;
            event.target.textContent = 'save';
            break;
        case 'save':
            console.log(targetParent)
            Check(targetParentChildrenName.textContent, targetParentChildrenPhone.textContent);
            if (checked === true) {
                targetParentChildrenName.classList.remove("edit");
                targetParentChildrenPhone.classList.remove("edit");
                targetParentChildrenName.contentEditable = false;
                targetParentChildrenPhone.contentEditable = false;
                users[targetParent].name = targetParentChildrenName.textContent;
                users[targetParent].phone = targetParentChildrenPhone.textContent;
                event.target.textContent = 'edit';
                updateLocal();
                checked = false;
                edited = false;
            }

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
    if (checked === true) {
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
        updateLocal();
        checked = false;
    }

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