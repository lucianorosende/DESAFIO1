const socket = io();

//ACA RECIBO LOS DATOS DEL BACK
socket.on("msg_back_to_front", (data) => {
    console.log(JSON.stringify(data));
});

socket.on("msg_back_to_todos_menos_socket", (data) => {
    console.log(JSON.stringify(data));
});

socket.on("msg_back_todos", (data) => {
    console.log(JSON.stringify(data));
});
