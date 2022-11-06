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
        window.location = "./flota.html"

    })
}
callButton()