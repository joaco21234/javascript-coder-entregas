
const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');

let carrito = [];

function actualizarCarrito() {
    cartItems.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.textContent = `${item.nombre} - $${item.precio}`;
        cartItems.appendChild(div);
        total += item.precio;
    });
    cartTotal.textContent = `Total: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//mostrar el carrito
cartBtn.addEventListener('click', () => {
    actualizarCarrito();
    cartPanel.classList.add('show');
});

//borrar carrito
clearCartBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    mostrarNoti("🗑️ Carrito borrado");
});

//cerrar
closeCart.addEventListener('click', () => {
    cartPanel.classList.remove('show');
});

//agregar productos desde cards
document.querySelectorAll('.agregar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.getAttribute('data-nombre');
        const precio = parseFloat(btn.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio);
    });
});

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}
function mostrarNoti(mensaje) {
    const noti = document.getElementById('noti');
    noti.textContent = mensaje;
    noti.classList.add('show');

    setTimeout(() => {
        noti.classList.remove('show');
}, 1200);
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    mostrarNoti(`✅ ${nombre} agregado al carrito`);
}

//finalizar compra
checkoutBtn.addEventListener('click', () => {
    const mensajeCompra = document.getElementById('mensaje-compra');

    if (carrito.length === 0) {
        mensajeCompra.textContent = 'El carrito está vacío.';
        return;
    }

    let mensaje = 'Gracias por tu compra 🛍️<br><br>Productos comprados:<br>';
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} - $${item.precio}<br>`;
    });

    let totalCompra = carrito.reduce((acc, item) => acc + item.precio, 0);
    mensaje += `<br><strong>Total: $${totalCompra} USD</strong>`;

    mensajeCompra.innerHTML = mensaje;
    localStorage.setItem('resumenCompra', mensaje);
    localStorage.setItem('totalCompra', totalCompra);

    carrito = [];
    actualizarCarrito();
    localStorage.removeItem('carrito');

    document.getElementById('volver-a-comprar').style.display = 'inline-block';
    document.getElementById('volver-a-comprar').addEventListener('click', () => {
        document.getElementById('mensaje-compra').innerHTML = '';
        document.getElementById('volver-a-comprar').style.display = 'none';
    });
});

