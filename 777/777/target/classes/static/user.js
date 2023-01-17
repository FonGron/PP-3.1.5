const url = 'http://localhost:8080/api/user';
const data = document.getElementById("data-user");
const panelU = document.getElementById("user-panel");


function userAuthInfo() {
    fetch(url)
        .then((res) => res.json())
        .then((user) => {
            let temp = "";
            temp += `<tr>
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.password}</td>
            </tr>`;
            data.innerHTML = temp;
            panelU.innerHTML = `<h5>${user.email} with roles: ${user.roles.map(role => role.name.substring(5)).join(' ')}</h5>`

        });
}
userAuthInfo()