class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = Number(precio);
        //Se podía agregar una llave código para que sea mas realista trabajar con el objeto producto
    }
}
class Carrito {
    constructor() {
        this.productosSeleccionados = [];
    }
    agregar() {
        let codigo = document.getElementById('codigo').value
        let cantidad = document.getElementById('cantidad').value
        if (codigo >= 1 && codigo <= catalogo.length) {
            let productoSeleccionado = catalogo[codigo - 1];
            if (!isNaN(cantidad) && cantidad > 0) {
                productoSeleccionado.cantidad = cantidad
                this.productosSeleccionados.push(productoSeleccionado);
                document.getElementById('codigo').value='';
                document.getElementById('cantidad').value='';
                document.getElementById('codigo').focus()
            } else {
                alert('Cantidad invalida.\nPor favor ingresar numero mayo o igual a 1.');
            }
        } else {
            alert('Código invalido.\nPor favor ingresar uno disponible en el catálogo');
        }
        //Se podia validar que la cantidad sea solo numeros enteros
    }
    calcularTotal() {
        let total = this.productosSeleccionados.reduce((acumulador, producto) => {
            return acumulador + (producto.precio * producto.cantidad);
        }, 0)
        return total;
    }
    finalizar() {
        if (this.productosSeleccionados.length > 0) {
            let confirmarFin = confirm('¿Esta seguro que desea finalizar la compra?');
            if (confirmarFin) {
                alert(`Compra finalizada con exito\n El total es $${this.calcularTotal()}`);
            }
        } else {
            alert('No hay productos en el carrito');
        }
    }
    mostrar() {
        document.getElementById('cuerpo-tabla').innerHTML = ''
        document.getElementById('total').innerHTML = ''
        this.productosSeleccionados.forEach((producto, indice) => {
            document.getElementById('cuerpo-tabla').innerHTML += 
            `
            <tr>
                <th scope="row">${indice + 1}</th>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.cantidad * producto.precio}</td>
            </tr>
            `;
            document.getElementById('total').innerHTML = `Total : $${this.calcularTotal()}`
            //se podría hacer una validación para que no se repita un producto seleccionado en el carrito y solo aumente la cantidad.
        });
    }
    //Se podria agregar una función formateadora de divisas que sea llamada en cada renderización de un dato tipo moneda.
};

const catalogo = [
    new Producto('Leche', 1000),
    new Producto('Pan lactal', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azucar', 1300)
    //se podria agregar una función que renderice el catálogo en el DOM a partir de este array
];

let carrito = new Carrito();

document.getElementById('btn-agregar').addEventListener('click', (e) => {
    e.preventDefault();
   carrito.agregar()
    carrito.mostrar()
})
document.getElementById('btn-finalizar').addEventListener('click', (e) => {
    e.preventDefault();
    carrito.finalizar()
})