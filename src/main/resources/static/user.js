const navbarName = document.getElementById('navbarName')
const navbarRole = document.getElementById('navbarRole')
const alluser_table = document.querySelector('#alluser_table tbody')

function getUserNavbar() {
    fetch('/api/user/authorization')
        .then(response => response.json())
        .then(user => {
            let text1 = user.login
            let text2 = user.roles.map(r => r.roleName)
            navbarName.innerHTML = text1
            navbarRole.innerHTML = text2
        })
}
getUserNavbar()

//FILL USER TABLE
const fillUsersTable = () => {
    let result = ''
    fetch('/api/user/authorization')
        .then(response => response.json())
        .then(user => {
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
                            </tr>`
            alluser_table.innerHTML = result
        })
}
fillUsersTable();