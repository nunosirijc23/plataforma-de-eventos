const buyTicketForm = document.querySelector('#buyTicketForm');

buyTicketForm.addEventListener('submit', e => {
    e.preventDefault();

    Swal.fire({
        title: 'Comprar o bilhete?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/users/buy-ticket', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: buyTicketForm.querySelector("[name=eventId]").value.trim(),
                    userId: buyTicketForm.querySelector('[name=userId]').value.trim(),
                    payment: buyTicketForm.querySelector("[name=payment]").value.trim()
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
    })
})