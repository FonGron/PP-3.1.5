const url = 'http://localhost:8080/api/admin/';
const data = document.getElementById("user-info");

//Информация о пользователе
const panelA = document.getElementById("admin-panel");

function userAuthInfo() {
    fetch('http://localhost:8080/api/user')
.then((res) => res.json())
        .then((user) => {
            let temp = "";
            temp += `<tr>
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.password}</td>
            </tr>`;
            console.log(temp)
            data.innerHTML = temp;
        });
}

userAuthInfo()

function userPanel() {
    fetch('http://localhost:8080/api/user')
        .then((res) => res.json())
        .then((user) => {
            panelA.innerHTML = `<h5>${user.email} with roles: ${user.roles.map(roles => roles.name.substring(5)).join(' ')}</h5>`
        });
}

userPanel()

//Список всех пользователей
const renderTable = document.getElementById("all-users-table");

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            let temp = "";
            data.forEach((user)=>{
                temp += `<tr>
                        
                        <td>${user.email}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.password}</td>
                        <td>${user.roles.map(role => " " + role.name)}</td> 
                <td>
                                <button class="btn btn-info" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="editModal(${user.id})">Edit</button></td>
                                <td>
                                <button class="btn btn-danger" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalDelete"
                                onclick="deleteModal(${user.id})">Delete</button></td>
                                <td>
                                
                        `;
            })
            renderTable.innerHTML = temp;
        })
}

getAllUsers()

//Новый пользователь
const addForm = document.getElementById("formNewUser");

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let emailValue = document.getElementById("email").value;
    let firstNameValue = document.getElementById("firstName").value;
    let lastNameValue = document.getElementById("lastName").value;
    let passwordValue = document.getElementById("password").value;
    let role = getRoles(Array.from(document.getElementById("role").selectedOptions).map(roles => roles.value));
    let newUser = {
        email: emailValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        password: passwordValue,
        roles: role
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    }).then(data => {
        const dataArr = [];
        dataArr.push(data);
        getAllUsers(data);
    }).then(() => {
        document.getElementById("nav-admin-tab").click();
    })
})


function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("USER") >= 0) {
        roles.push({"id": 1});
    }
    if (rols.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}

//Удалить пользователя
function deleteModal(id) {
    fetch(url + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(user => {
                document.getElementById('idDel').value = user.id;
                document.getElementById('firstNameDel').value = user.firstName;
                document.getElementById('lastNameDel').value = user.lastName;
                document.getElementById('emailDel').value = user.email;
            })
    })
}

async function deleteUser() {
    await fetch('http://localhost:8080/api/admin/' + document.getElementById('idDel').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDel').value)
    })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            getAllUsers()
            document.getElementById("closeDeleteModal").click();})
}

//Изменить пользователя

function editModal(id) {
    fetch(url + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {

            document.getElementById('idEditUser').value = user.id;
            document.getElementById('editUserFirstName').value = user.firstName;
            document.getElementById('editUserLastName').value = user.lastName;
            document.getElementById('editUserEmail').value = user.email;
            document.getElementById('editUserPassword').value = user.password;

        })
    });
}

async function editUser() {
    let idValue = document.getElementById("idEditUser").value;
    let nameValue = document.getElementById("editUserFirstName").value;
    let lastNameValue = document.getElementById("editUserLastName").value;
    let emailValue = document.getElementById("editUserEmail").value;
    let passwordValue = document.getElementById("editUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("editUserRoles").selectedOptions).map(roles => roles.value));

    let user = {
        id: idValue,
        firstName: nameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        roles : roles

    }

    await fetch('http://localhost:8080/api/admin', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    getAllUsers()
}