class Persona {
    constructor(gasto, importe, card, numero) {
        this.gasto = gasto;
        this.importe = importe;
        this.card = card;
        this.numero = numero;
    }
}


let importeUno = 0;
let importeDos = 0;
let gastoTotalUno = document.querySelector("#totalUno")
let gastoTotalDos = document.querySelector("#totalDos")
let resultadoDeuda = "";
let nombreDeudor = document.querySelector(".nombreDeudor")
let persUno = document.querySelector("#personaUno")
let persDos = document.querySelector("#personaDos")
let montoDeuda = document.querySelector(".montoDeuda")


class UI {
    agregarGasto(persona) {
        const total = document.querySelector(".divTotalUno")
        const totalDos = document.querySelector(".divTotalDos")
        const listaGastos = persona.card;
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="text-center mb-1 gastos" id="gastoInd">
                <div class="d-flex">
                    <strong class="me-3">Gasto:</strong> ${persona.gasto}
                    <strong class="ms-5 me-3">Precio:</strong> <span class="importe">${persona.importe}</span>
                    <a href="#" class="btn btn-danger ms-auto" name="delete">Eliminar</a>
                </div>
            </div>
        `;
        listaGastos.appendChild(element);

        if (persona.numero === 1) {
            listaGastos.insertBefore(element, total)
            importeUno += parseInt(persona.importe)
            gastoTotalUno.innerHTML = importeUno
            document.getElementById('form_primer').reset();
        } else if (persona.numero === 2) {
            listaGastos.insertBefore(element, totalDos)
            importeDos += parseInt(persona.importe)
            gastoTotalDos.innerHTML = importeDos
            document.getElementById('form_segundo').reset();
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-5`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container--xxl');
        const app = document.querySelector('.cardMod');
        container.insertBefore(div, app);
        setTimeout(() => {
            div.remove();
        }, 2500);
    }


    deleteProduct(element) {

        if (element.parentNode.parentNode.parentNode.parentNode.classList.contains("bodyUno")) {
            let numero = parseInt(element.parentNode.children[2].innerHTML)
            importeUno -= numero
            gastoTotalUno.innerHTML = importeUno

            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado satisfactoriamente', 'danger');
        }
        else if (element.parentNode.parentNode.parentNode.parentNode.classList.contains("bodyDos")) {
            let numero = parseInt(element.parentNode.children[2].innerHTML)
            importeDos -= numero
            gastoTotalDos.innerHTML = importeDos
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado satisfactoriamente', 'danger');
        }

    }

    calcularDeuda(personaUno, personaDos, nombre) {
        let uno = parseInt(personaUno)
        let dos = parseInt(personaDos)
        resultadoDeuda = (uno - dos) / 2
        nombreDeudor.innerHTML = `${nombre.innerHTML}`
        montoDeuda.innerHTML = resultadoDeuda
    }

}



document.getElementById('form_primer').addEventListener('submit', function (e) {
    const gasto = document.getElementById('name').value;
    const importe = document.getElementById('price').value;
    const card = document.querySelector('.bodyUno');
    const numero = 1;

    const persona = new Persona(gasto, importe, card, numero);
    const ui = new UI();

    if (importe === "") {
        return ui.showMessage('Completa el formulario', 'info')
    }

    ui.agregarGasto(persona);
    e.preventDefault();
})




document.querySelector("#form_segundo").addEventListener("submit", function (e) {
    const gasto = document.getElementById('nameDos').value;
    const importe = document.getElementById('priceDos').value;
    const card = document.querySelector('.bodyDos');;
    const numero = 2;

    const persona = new Persona(gasto, importe, card, numero);
    const personaN = 2;
    const ui = new UI();

    if (importe === "") {
        return ui.showMessage('Completa el formulario', 'info')
    }

    ui.agregarGasto(persona);
    e.preventDefault();
})

document.getElementById('tarjetas').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})

document.querySelector(".calcular").addEventListener('click', function (e) {
    let totalUno = document.querySelector("#totalUno").innerHTML
    let totalDos = document.querySelector("#totalDos").innerHTML
    const ui = new UI();

    if (parseInt(totalUno) > parseInt(totalDos)) {
        ui.calcularDeuda(totalUno, totalDos, persDos)
    } else {
        ui.calcularDeuda(totalDos, totalUno, persUno)
    }
})