const approveTicketElements = document.querySelectorAll('.approveTicket');
const rejectTicketElements = document.querySelectorAll('.rejectTicket');

approveTicketElements.forEach(ticket => {
    ticket.addEventListener('click', e => {
        let tr = e.composedPath().find(path => {
            return (path.tagName.toUpperCase() == 'TR');
        });

        let ticketData = JSON.parse(tr.dataset.row);

        Swal.fire({
            title: 'Aprovar a compra?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            icon: 'question'
        }).then(result => {
            if (result.isConfirmed) {
                fetch('/producers/validate-ticket', {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: ticketData.id,
                        isApproved: true
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
})


rejectTicketElements.forEach(ticket => {
    ticket.addEventListener('click', e => {
        let tr = e.composedPath().find(path => {
            return (path.tagName.toUpperCase() == 'TR');
        });

        let ticketData = JSON.parse(tr.dataset.row);

        Swal.fire({
            title: 'Rejeitar a compra?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            icon: 'question'
        }).then(result => {
            if (result.isConfirmed) {
                fetch('/producers/validate-ticket', {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: ticketData.id,
                        isApproved: false
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
})

