const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const tiketControl = new TicketControl()


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguienteTicket = tiketControl.siguienteTicket()

        console.log(siguienteTicket)
        callback(siguienteTicket)
    })

    client.emit('estadoActual', {
        actual: tiketControl.getUltimoTicket(),
        ultimos4: tiketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = tiketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

        client.broadcast.emit('ultimos4', {
            ultimos4: tiketControl.getUltimos4()
        })

    })

});