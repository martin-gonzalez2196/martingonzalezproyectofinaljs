//función para mostrar los productos del data.json.

var carritoProductos = [];

async function fetchCarritoProductos() {
    const response = await fetch('./data.json');
    return await response.json();
}

fetchCarritoProductos().then(productos => {
    carritoProductos = productos
    mostrarAutos(carritoProductos)
})

//función para mostrar en CARDS los distintos autos disponibles.

function mostrarAutos(productos) {
    const productContainer = document.getElementById("product-container");
    productos.forEach(producto => {
        const card = document.createElement('card');
        card.innerHTML += `<div class="card text-center" style="width: 18rem">
        <img
            src="${producto.imagen}"
            alt="Foto de auto"
            style="padding: 25px"
            class="card-img-top"
            alt="Foto de Auto"
        />
        <div class="card-body">
            <h5 class="card-title">${producto.modelo}</h5>
            <p class="card-text">
            $${producto.precio}.- por día.
            </p>
            <a href="#" class="btn btn-primary" id="${producto.id}">Agregar al Carrito</a>
        </div>
    </div>`
    productContainer.appendChild(card);

    const button = document.getElementById(`${producto.id}`);
    button.addEventListener(`click`, () => {
        carrito(`${producto.id}`);
        alert(producto.modelo)
    })
    })
}

mostrarAutos(carritoProductos)

function alert(productoModelo){
    Swal.fire({
        icon: 'warning',
        title: 'Usted está por reservar el siguiente vehiculo:',
        text: productoModelo,
        confirmButtonText: 'Confirmar',
        footer: '<b>Ir al Carrito para confirmar la reserva.</b>',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCloseButton: true,
    })
}

//función para pushear los productos al carrito y que este muestre un modal, donde se pueden quitar los productos seleccionados.

var carritoVacio = [];

const carrito = (productoId) => {
    const cartContainer = document.getElementById("cart-container");
    
    const mostrarProductosEnCarrito = () =>{
        let producto = carritoProductos.find(p => p.id === Number(productoId));
        carritoVacio.push(producto)
        let div = document.createElement('div');
        div.setAttribute("id",`${producto.id}`);
        div.innerHTML = `<p>${producto.modelo}</p>
        <p>Precio: $${producto.precio}</p>
        <button class="btn btn-danger btn-sm" id="delete_${producto.id}">Quitar</button>`
        cartContainer.appendChild(div)
        const buttonDelete = document.getElementById(`delete_${producto.id}`);
        buttonDelete.addEventListener('click',(e) => {
            deleteProduct(e)
        })
    }

//función para que se sumen los productos seleccionados.

    const updateTotal = () =>{
        let total = 0
        carritoVacio.forEach((p)=>{
            total = total + p.precio;
        })
        document.getElementById("totalFinal").value = total;
    }

    mostrarProductosEnCarrito()
    recargaLocalStorage()
    updateTotal()
    };

    function deleteProduct(e) {
        let btnClicked = e.target;
        btnClicked.parentElement.remove()
    }

    function recargaLocalStorage(){
    localStorage.setItem("Carrito",JSON.stringify(carritoVacio))
}

//función para que el boton BUSCAR DISPONIBILIDAD del INDEX.HTML guarde la info. en el LocalStorage y que a su vez, rediriga a la página de FLOTA.

function callButton() {
    const button = document.getElementById("buttonDisponibilidad");
    button.addEventListener(`click`, () => {
        const nombre = document.getElementById('nombreApellido').value
        const correo = document.getElementById('correo').value
        localStorage.setItem("userInfo",JSON.stringify(
            {
                nombre:nombre,
                correo:correo
            }
        ))
        window.location = "http://127.0.0.1:5500/flota.html"

    })
}
callButton()

//Función para que cuando el usuario aprete el boton CONFIRMAR RESERVA, devuelva un mensaje final con los datos del usuario guardados en el LocalStorage.

function buttonConfirmReserva() {
    const userData = JSON.parse(window.localStorage.getItem("userInfo")); 
    mensajeFinal(userData.nombre, userData.correo)
}

function mensajeFinal(nombre, correo){
    Swal.fire({
        icon: 'success',
        title: `Estimado/a, ${nombre}`,
        text: `Se envió la confirmación de su reserva a: ${correo}`,
        confirmButtonText: 'Finalizar',
        footer: '<b>Muchas gracias por su compra!</b>',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCloseButton: true,
    })
}