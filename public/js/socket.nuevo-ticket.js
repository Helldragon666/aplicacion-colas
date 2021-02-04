
// Comando para establecer la conexion 

let socket = io()

let label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('conectado al servidor')
})

socket.on('estadoActual', (resp) => {
    label.text(resp.actual)
})

socket.on('disconnect', () => {
    console.log('Perdimos conexion con el servidor')
})

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket)
    })
})

