const createEventForm = document.querySelector("#createEventForm");
const updateEventForm = document.querySelector("#updateEventForm");
const updateEventModal = document.querySelector("#updateEventModal");
const tableUpdateElements = document.querySelectorAll(".updateEvent");
const tablePhotoElements = document.querySelectorAll('.changePhoto');
const changeEventPhotoForm = document.querySelector('#changeEventPhotoForm');
let formEventPhotoData = null;

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
});

tableUpdateElements.forEach( element => {
    element.addEventListener('click', e => {
        let tr = e.path.find(path => {
            return (path.tagName.toUpperCase() == 'TR')
        });

        let eventData = JSON.parse(tr.dataset.row);
        
        for (let name in eventData) {
            switch (name) {
                default:
                    let input = updateEventForm.querySelector(`[name=${name}]`)
                    if (input) input.value = eventData[name]
            }
        }

        $('#updateEventModal').modal('show');
    });
});

updateEventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Editar o evento?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/producers/events', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: updateEventForm.querySelector('[name=id]').value.trim(),
                    name: updateEventForm.querySelector('[name=name]').value.trim(),
                    date: updateEventForm.querySelector('[name=date]').value,
                    startTime: updateEventForm.querySelector('[name=startTime]').value,
                    endTime: updateEventForm.querySelector('[name=endTime]').value,
                    price: updateEventForm.querySelector('[name=price]').value,
                    capacity: updateEventForm.querySelector('[name=capacity]').value,
                    province: updateEventForm.querySelector('[name=province]').value.trim(),
                    county: updateEventForm.querySelector('[name=county]').value.trim(),
                    district: updateEventForm.querySelector('[name=district]').value.trim(),
                    street: updateEventForm.querySelector('[name=street]').value.trim(),
                    description: updateEventForm.querySelector('[name=description]').value.trim(),
                    categoryId: updateEventForm.querySelector('[name=categoryId]').value,
                    producerId: updateEventForm.querySelector('[name=producerId]').value
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
});

tablePhotoElements.forEach( element => {
    element.addEventListener('click', e => {
        let tr = e.path.find(path => {
            return (path.tagName.toUpperCase() == 'TR')
        });

        let eventData = JSON.parse(tr.dataset.row);

        let input = changeEventPhotoForm.querySelector(`[name=id]`)
        input.value = eventData["id"];

        $('#changeEventPhotoModal').modal('show');
    });
});

changeEventPhotoForm.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', changeEventPhotoForm.querySelector(`[name=id]`).value);
    data.append('photo', changeEventPhotoForm.querySelector('input[type="file"]').files[0]);

    Swal.fire({
        title: 'Alterar imagem?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            fetch('/producers/events/photo', {
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
    })
})
