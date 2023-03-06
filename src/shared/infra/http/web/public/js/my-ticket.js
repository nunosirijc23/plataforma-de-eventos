const btnDownloadTicket = document.querySelectorAll('.downloadTicket');

btnDownloadTicket.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let tr = e.composedPath().find(path => {
            return (path.tagName.toUpperCase() == 'TR')
        });

        let data = JSON.parse(tr.dataset.row);

        pdfMake.fonts = {
            Roboto: {
                normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
                bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
                italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
                bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
            },
        }

        const docDefinition = {
            content: [
                { text: 'SPREAD', style: 'header' },
                'A sua plataforma de eventos',
                { text: '', margin: [0, 10, 0, 0]},
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        body: [
                            [{text: 'Cliente', style: 'tableHeader'}, {text: 'Evento', style: 'tableHeader'}, {text: 'Preço', style: 'tableHeader'}, {text: 'Data e Hora', style: 'tableHeader'}],
                            [`${data.user.name}`, `${data.ticket.name}`, `${data.ticket.price} AOA`, `${new Date(data.ticket.date).toLocaleDateString('pt-PT', {})} as ${data.ticket.startTime}`],
                        ]
                    },
                    layout: 'headerLineOnly'
                }
            ],

            styles: {
                header: {
                    fontSize: 28,
                    bold: true
                },
                anotherStyle: {
                    italics: true,
                    alignment: 'right'
                },
                tableExample: {
                    margin: [0, 10, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },

            defaultStyle: {
                font: 'Roboto'
            }
        };


        pdfMake.createPdf(docDefinition).download();
    })
});