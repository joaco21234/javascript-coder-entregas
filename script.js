
// productos
const productos = [
    { id: 1, nombre: 'iphone 8', precio: 250 },
    { id: 2, nombre: 'iphone 11', precio: 500 },
    { id: 3, nombre: 'iphone 12', precio: 700 },
    { id: 4, nombre: 'iphone 13', precio: 1100 },
];

let carrito = []
let total = 0;

// funcion para mostrar los productos y seleccionar 
function mostrarProductos() {
    let mensaje = "Elige un producto para agregar al carrito:\n";
    productos.forEach(producto => {
        mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += "0. Finalizar compra";

    let seleccion = parseInt(prompt(mensaje));

    switch (seleccion) {
        case 0:
            return finalizarCompra();
        case 1:
        case 2:
        case 3:
        case 4:
            return agregarAlCarrito(seleccion);
        default:
            alert("Producto no encontrado. Intenta de nuevo.");
            return mostrarProductos();
    }
}

// funcion para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    total += producto.precio;
    alert(`${producto.nombre} ha sido agregado a tu carrito. Total: $${total}`);
    mostrarProductos();
}

// funcion para finalizar la compra
function finalizarCompra() {
    let resumen = carrito.length > 0 ? "Tu compra ha sido completada:\n" : "No has agregado productos al carrito.";
    carrito.forEach(producto => {
        resumen += `${producto.nombre} - $${producto.precio}\n`;
    });
    resumen += `Total a pagar: $${total}`;
    alert(resumen);
}

mostrarProductos();


