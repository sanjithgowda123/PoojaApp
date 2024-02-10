document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crud-form');
    const userList = document.getElementById('user-list');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
            alert('Please provide both name and email.');
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            if (!response.ok) {
                throw new Error('Failed to add user.');
            }

            const user = await response.json();
            appendUserToList(user);
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add user.');
        }
    });

    async function getUsers() {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users.');
            }

            const users = await response.json();
            users.forEach(appendUserToList);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch users.');
        }
    }

    function appendUserToList(user) {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    }

    getUsers();
});
