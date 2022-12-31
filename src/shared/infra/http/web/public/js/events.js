const btnUpdateUserData = document.querySelector("#btnUpdateUserData");
const btnChangeUserPhoto = document.querySelector("#btnChangeUserPhoto");
const btnChangeUserPassword = document.querySelector("#btnChangeUserPassword");
const updateUserDataForm = document.querySelector("#updateUserDataForm");
const changeUserPhotoForm = document.querySelector("#changeUserPhotoForm");
const changeUserPasswordForm = document.querySelector("#changeUserPasswordForm");

btnUpdateUserData.addEventListener("click", (e) => {
    $('#updateUserDataModal').modal('show');
});

btnChangeUserPhoto.addEventListener("click", (e) => {
    $('#changeUserPhotoModal').modal('show');
});

btnChangeUserPassword.addEventListener("click", (e) => {
    $('#changeUserPasswordModal').modal('show');
});

updateUserDataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Alterar dados?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/users/changeData', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: updateUserDataForm.querySelector("[name=id]").value.trim(),
                    name: updateUserDataForm.querySelector('[name=name]').value.trim(),
                    email: updateUserDataForm.querySelector("[name=email]").value.trim(),
                    phone: updateUserDataForm.querySelector("[name=phone]").value.trim()
                })
            })
                .then(data => data.json())
                .then(json => {
                    if (json.message) {
                        Swal.fire(json.message, '', 'success').then(r => {
                            if (r.isConfirmed) {
                                location.reload()
                            }
                        })
                    } else {
                        if (json.error && json.info) {
                            Swal.fire(json.error, '', 'info')
                        } else {
                            Swal.fire(json.error, '', 'error')
                        }
                    }
                })
        }
    });
});

changeUserPhotoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', changeUserPhotoForm.querySelector(`[name=id]`).value);
    data.append('photo', changeUserPhotoForm.querySelector('input[type="file"]').files[0]);

    Swal.fire({
        title: 'Alterar foto?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/users/changePhoto', {
                method: 'PATCH',
                body: data
            })
                .then(data => data.json())
                .then(json => {
                    if (json.message) {
                        Swal.fire(json.message, '', 'success').then(r => {
                            if (r.isConfirmed) {
                                location.reload()
                            }
                        })
                    } else {
                        if (json.error && json.info) {
                            Swal.fire(json.error, '', 'info')
                        } else {
                            Swal.fire(json.error, '', 'error')
                        }
                    }
                })
        }
    });
});

changeUserPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Alterar senha?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/users/changePassword', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: changeUserPasswordForm.querySelector("[name=id]").value.trim(),
                    password: changeUserPasswordForm.querySelector('[name=password]').value,
                })
            })
                .then(data => data.json())
                .then(json => {
                    if (json.message) {
                        Swal.fire(json.message, '', 'success').then(r => {
                            if (r.isConfirmed) {
                                location.reload()
                            }
                        })
                    } else {
                        if (json.error && json.info) {
                            Swal.fire(json.error, '', 'info')
                        } else {
                            Swal.fire(json.error, '', 'error')
                        }
                    }
                })
        }
    });
});