const createEventForm = document.querySelector("#createEventForm");

createEventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Criar este evento?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/producers/events', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: createEventForm.querySelector('[name=name]').value.trim(),
                    date: createEventForm.querySelector('[name=date]').value,
                    startTime: createEventForm.querySelector('[name=startTime]').value,
                    endTime: createEventForm.querySelector('[name=endTime]').value,
                    price: createEventForm.querySelector('[name=price]').value,
                    capacity: createEventForm.querySelector('[name=capacity]').value,
                    province: createEventForm.querySelector('[name=province]').value.trim(),
                    county: createEventForm.querySelector('[name=county]').value.trim(),
                    district: createEventForm.querySelector('[name=district]').value.trim(),
                    street: createEventForm.querySelector('[name=street]').value.trim(),
                    description: createEventForm.querySelector('[name=description]').value.trim(),
                    categoryId: createEventForm.querySelector('[name=categoryId]').value,
                    producerId: createEventForm.querySelector('[name=producerId]').value
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