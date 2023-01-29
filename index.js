const API_URL = `https://jsonplaceholder.typicode.com/users`;
let allUsers = [];
const search = async (key, filter) =>{
    const response = await fetch(API_URL);
    let ret = null;
    if (key && filter){
        const users = response ? await response.json() : null;
        if (users){
            ret = users.filter((item)=>{
                if(filter==='username'){
                    return item.username.toLowerCase().includes(key.toLowerCase());
                } else if(filter==='email'){
                    return item.email.toLowerCase().includes(key.toLowerCase());
                }else{
                    // name
                    return item.name.toLowerCase().includes(key.toLowerCase());
                }
            });
        } else {
            ret = users;
        }
    } else {
        ret = response ? await response.json() : null;
    }
    allUsers = ret;
    return ret;
}
const createTd = (row, value) => {
    const td = document.createElement('td');
    td.textContent = value;
    row.appendChild(td);
}
const createRow = (tbody, user) => {
    const row = document.createElement('tr');

    //id
    createTd(row, user.id);
    //name
    createTd(row, user.name);
    //username
    createTd(row, user.username);
    //email
    createTd(row, user.email);
    //phone
    createTd(row, user.phone);

    tbody.appendChild(row);
}
const names = () => {
    return allUsers.map((item)=>{
        return item.name;
    });
}
const addresses = () => {
    return allUsers.map((item)=>{
        const {street, suite, city, zipcode} = item.address; 
        return `${street}, ${suite}, ${city} (${zipcode})`;
    });
}
window.onload = async () => {
    try {
        const table = document.querySelector('#table-users');
        const tbody = table.querySelector('tbody');

        const searchBar = document.querySelector('#search');
        const dropdown = document.querySelector('#users-filter');
        const btn = document.querySelector('#search-btn');
        btn.addEventListener('click', async (event) => {
            const filter = dropdown.value;
            const key = searchBar.value;
            if(key.length > 2 && filter.length > 0){
                const result = await search(key, filter);
                tbody.innerHTML = '';
                if (result) {
                    for (const user of result) {
                        createRow(tbody, user);
                    }
                }
            }
        });
        const users = await search();
        if (users){
            console.log(users);
            tbody.innerHTML = '';
            for (const user of users) {
                createRow(tbody, user);
            }
        }
    } catch (error) {
        console.log(error);
    }
};