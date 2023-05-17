const sockets = io();

const submitForm = () => {
    event.preventDefault();
    let form = document.getElementById("myForm");
    const newObj = {
        title: form.elements[0].value,
        description: form.elements[1].value,
        price: Number(form.elements[2].value),
        thumbnail: form.elements[3].value,
        code: form.elements[4].value,
        stock: Number(form.elements[5].value),
        category: form.elements[6].value,
    };
    sockets.emit("newProduct", newObj);
};

let table = document.getElementById("tableProducts");
sockets.emit("deploy", "deploy");
sockets.on(
    "products",
    (data) =>
        (table.innerHTML = data.map((product) => {
            return `<tr>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>${product.id}</td>
            <td><button>x</button></td>
        </tr>`;
        }))
);

const deleteProduct = () => {
    sockets.emit("deleteProducts", "delete");
};
