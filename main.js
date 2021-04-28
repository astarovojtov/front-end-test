let inputName = document.getElementById("inputName");
let inputPhone = document.getElementById("inputPhone");
let submit = document.getElementById("submit");
let output = document.getElementById('output');
var contact = document.createElement('div');
var errorMessage = document.getElementById('error-message');
let checked = false;
let edited = false;
let localPhone;
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
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Enter Name or Phone';
            return false;
        };
        if (!controlName.test(name)) {
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Invalid Name';
            return false;
        };
        if (!controlPhone.test(phone)) {
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Invalid Phone';
            return false;
        };
        if (users.length != 0) {
            let userIndex = users.findIndex(user => user.phone === phone)
            if (userIndex != -1) {
                errorMessage.classList.add('open-error');
                let textError = document.getElementById('textError');
                textError.innerHTML = 'Phone already exists';
                return false;
            };
        }
        if (errorMessage.classList.contains('open-error')) {
            errorMessage.classList.remove('open-error');
        }
        checked = true;
    } else {
        let controlName = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
        let controlPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (inputName.value == "" || inputPhone.value == "") {
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Enter Name or Phone';
            return false;
        };
        if (!controlName.test(inputName.value)) {
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Invalid Name';
            return false;
        };
        if (!controlPhone.test(inputPhone.value)) {
            errorMessage.classList.add('open-error');
            let textError = document.getElementById('textError');
            textError.innerHTML = 'Invalid Phone';
            return false;
        };
        if (users.length != 0) {
            let userIndex = users.findIndex(user => user.phone === inputPhone.value)
            if (userIndex != -1) {
                errorMessage.classList.add('open-error');
                let textError = document.getElementById('textError');
                textError.innerHTML = 'Phone already exists';
                return false;
            };
        }
        if (errorMessage.classList.contains('open-error')) {
            errorMessage.classList.remove('open-error');
        }
        checked = true;
    }
}


output.onclick = function (event) {
    let target = event.target.textContent;
    let targetParent = event.target.parentNode.parentNode;
    let targetParentChildrenName = event.target.parentNode.parentNode.childNodes[1];
    let targetParentChildrenPhone = event.target.parentNode.parentNode.childNodes[3];
    if (edited === false && targetParentChildrenPhone.textContent) {
        localPhone = targetParentChildrenPhone.textContent;
    }
    switch (target) {
        case 'delete':
            targetParent.classList.add("destroy");
            let userIndex = users.findIndex(user => user.phone === targetParentChildrenPhone.textContent)
            setTimeout(function () {
                users.splice(userIndex, 1);
                updateLocal();
                targetParent.remove();
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
            Check(targetParentChildrenName.textContent, targetParentChildrenPhone.textContent);
            if (checked === true) {
                targetParentChildrenName.classList.remove("edit");
                targetParentChildrenPhone.classList.remove("edit");
                targetParentChildrenName.contentEditable = false;
                targetParentChildrenPhone.contentEditable = false;
                let userIndex = users.findIndex(user => user.phone === localPhone)
                users[userIndex].name = targetParentChildrenName.textContent;
                users[userIndex].phone = targetParentChildrenPhone.textContent;
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
        this.name = object.name;
        this.phone = object.phone;
    }
}

function CreateContact() {
    if (checked === true) {
        var str = `<div class='grid-container'>
    <div class="name" contenteditable="false">${inputName.value}</div>
    <div class="phone" contenteditable="false">${inputPhone.value}</div>
    <div class="btn-edit"><button>edit</button></div>
    <div class="btn-del"><button>delete</button></div>
    </div>`;
        contact.innerHTML = str + contact.innerHTML;

        let user = new Contacts({
            name: inputName.value,
            phone: inputPhone.value,
        })
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

    for (var i = 0; i < users.length; i++) {
        var str = `<div class='grid-container'>
    <div class="name" contenteditable="false">${users[i].name}</div>
    <div class="phone" contenteditable="false">${users[i].phone}</div>
    <div class="btn-edit"><button>edit</button></div>
    <div class="btn-del"><button>delete</button></div>
    </div>`;
        contact.innerHTML = str + contact.innerHTML;

        let user = new Contacts({
            name: users[i].name,
            phone: users[i].phone,
        })
        output.append(contact)
    }
}

init();