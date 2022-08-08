const api_url = '/api/admin'
const api_urlNavbar = api_url + '/authorization'
const api_urlRoles = api_url + '/roles'
const api_urlUpdate = api_url + '/update'
const api_urlDelete = api_url + '/delete'
const api_urlNewUser = api_url + '/new'

function getAllRoles(target, currentValue = null) {
    fetch(api_urlRoles)
        .then(response => response.json())
        .then(roles => {
            let optionsRoles = ''
            let optionSelect = ''
            roles.forEach(role => {
                currentValue === role.roleName ? optionSelect = " selected " : optionSelect = ""
                optionsRoles += `<option value='${role.id}' ${optionSelect} >${role.roleName}</option>`
            })
            target.innerHTML = optionsRoles
        })
}

const action = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
function getUserNavbar() {
    fetch(api_urlNavbar)
        .then(response => response.json())
        .then(user => {
            let result1 = user.login
            let result2  = user.roles.map(r => r.roleName)
            navbarName.innerHTML = result1
            navbarRole.innerHTML = result2
        })
}
getUserNavbar()
getAllRoles(newUserRole)

//FILL USER TABLE

const alluser_table = document.querySelector('#alluser_table tbody')
const fillUsersTable = () => {
    let result = ''
    fetch(api_url)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                result += `<tr>
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.surname}</td>
                                <td>${user.age}</td>
                                <td>${user.email}</td>
                                <td>${user.login}</td>
                                <td>
                                    <a>${user.roles.map(r => r.roleName)}</a>
                                </td>
                                <td>
                                    <a type="button" class="btn btn-sm btn-primary btnEditUser" data-bs-toggle="modal"
                                       data-bs-target="#editModal">Edit</a>
                                </td>
                                <td>
                                    <a type="button" class="btn btn-sm btn-danger btnDeleteUser" data-bs-toggle="modal"
                                       data-bs-target="#DeleteModal">Delete</a>
                                </td>
                            </tr>`
            })
            alluser_table.innerHTML = result
        })
}
fillUsersTable()

// NEW USER

const newUserModal = document.getElementById('newUserModal')
const newUserModalCreate = bootstrap.Modal.getOrCreateInstance(newUserModal)
const newUserName = document.getElementById('newUserName')
const newUserSurname = document.getElementById('newUserSurname')
const newUserAge = document.getElementById('newUserAge')
const newUserEmail = document.getElementById('newUserEmail')
const newUserLogin = document.getElementById('newUserLogin')
const newUserPwd = document.getElementById('newUserPwd')

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

newUserModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#newUserRole');
    let setRoles = roleArray(options)
    fetch(api_urlNewUser, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: newUserName.value,
            surname: newUserSurname.value,
            age: newUserAge.value,
            email: newUserEmail.value,
            login: newUserLogin.value,
            password: newUserPwd.value,
            roles: setRoles
        })
    })
        .then(data => fillUsersTable(data))
        .catch(error => console.log(error))
    fillUsersTable()
    newUserModalCreate.hide()
    document.getElementById('newUser').reset();
})

// EDIT USER

const editModal = document.getElementById('editModal')
const newEditModal = bootstrap.Modal.getOrCreateInstance(editModal)
const editId = document.getElementById('editID')
const editName = document.getElementById('editName')
const editSurname = document.getElementById('editSurname')
const editAge = document.getElementById('editAge')
const editEmail = document.getElementById('editEmail')
const editLogin = document.getElementById('editLogin')
const editPwd = document.getElementById('editPwd')
const editRole = document.getElementById('editRole')

action(document, 'click', '.btnEditUser', e => {
    let target = e.target.parentNode.parentNode
    editId.value = target.children[0].innerHTML
    editName.value = target.children[1].innerHTML
    editSurname.value = target.children[2].innerHTML
    editAge.value = target.children[3].innerHTML
    editEmail.value = target.children[4].innerHTML
    editLogin.value = target.children[5].innerHTML
    editPwd.value = ''
    editRole.value = getAllRoles(editRole, target.children[6].children[0].innerHTML)
})

editModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#editRole');
    let setRoles = roleArray(options)
    fetch(api_urlUpdate + `/${editId.value}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: editId.value,
                name: editName.value,
                surname: editSurname.value,
                age: editAge.value,
                email: editEmail.value,
                login: editLogin.value,
                password: editPwd.value,
                roles: setRoles
            })
    })
        .then(data => fillUsersTable(data))
        .catch(error => console.log(error))
    fillUsersTable()
    newEditModal.hide()
})

// DELETE USER

const deleteModal = document.getElementById('DeleteModal')
const newDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal)
const deleteId = document.getElementById('deleteId')
const deleteName = document.getElementById('deleteName')
const deleteSurname = document.getElementById('deleteSurname')
const deleteAge = document.getElementById('deleteAge')
const deleteEmail = document.getElementById('deleteEmail')
const deleteLogin = document.getElementById('deleteLogin')
const deleteRole = document.getElementById('deleteRole')

action(document, 'click', '.btnDeleteUser', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    deleteId.value = target.children[0].innerHTML
    deleteName.value = target.children[1].innerHTML
    deleteSurname.value = target.children[2].innerHTML
    deleteAge.value = target.children[3].innerHTML
    deleteEmail.value = target.children[4].innerHTML
    deleteLogin.value = target.children[5].innerHTML
    deleteRole.value = getAllRoles(deleteRole)
})

deleteModal.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(api_urlDelete + `/${deleteId.value}`, {
        method: 'DELETE',
    })

        .then(data => fillUsersTable(data))
        .catch(error => console.log(error))
    fillUsersTable()
    newDeleteModal.hide()
})



