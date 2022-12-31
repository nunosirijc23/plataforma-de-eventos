const btnUpdateProducerData = document.querySelector("#btnUpdateProducerData");
const btnUpdateProducerPassword = document.querySelector("#btnUpdateProducerPassword");
const updateProducerDataForm = document.querySelector("#updateProducerDataForm");
const changeProducerPasswordForm = document.querySelector("#changeProducerPasswordForm");

btnUpdateProducerData.addEventListener("click", (e) => {
    $('#updateProducerDataModal').modal('show');
});

btnUpdateProducerPassword.addEventListener("click", (e) => {
    $('#changeProducerPasswordModal').modal('show');
});

updateProducerDataForm.addEventListener('submit', e => {
    e.preventDefault();

    Swal.fire({
        title: 'Alterar dados?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/producers/changeData', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: updateProducerDataForm.querySelector("[name=id]").value.trim(),
                    name: updateProducerDataForm.querySelector('[name=name]').value.trim(),
                    email: updateProducerDataForm.querySelector("[name=email]").value.trim(),
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

changeProducerPasswordForm.addEventListener('submit', e => {
    e.preventDefault();

    Swal.fire({
        title: 'Alterar senha?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/producers/changePassword', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: changeProducerPasswordForm.querySelector("[name=id]").value.trim(),
                    password: changeProducerPasswordForm.querySelector('[name=password]').value,
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
})