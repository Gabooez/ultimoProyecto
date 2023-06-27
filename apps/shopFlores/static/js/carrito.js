var carritoVisible = false;

if (document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    var botonEliminar = document.getElementsByClassName('btn-eliminar');
    for(var i = 0; i < botonEliminar.length;i++){
        var button = botonEliminar[i];
        button.addEventListener('click', eliminarItem);
    }
    var botonSumarCantidad = document.getElementsByClassName('summar-cantidad');
    for(var i =0; i <botonSumarCantidad.length;i++){
        var button = botonSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    var botonRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i =0; i <botonRestarCantidad.length;i++){
        var button = botonRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    var botonAgregarCarrito = document.getElementsByClassName('btn btn-success agregar');
    for(var i=0; i <botonAgregarCarrito.length;i++){
        var button = botonAgregarCarrito[i];
        button.addEventListener('click', agregarCarritoClicked);
    }

}

function eliminarItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotal();
    ocultarCarrito();
}

function actualizarTotal(){
    var contenedorCarrito = document.getElementsByClassName('carrito')[0];
    var carritoItems = contenedorCarrito.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00'
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '-100%';
    carrito.style.opacity = '0';
    carritoVisible = false;
}
}
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotal();

}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotal();
    }

}
function agregarCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('title-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imgSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemCarrito(titulo, precio, imgSrc);
    hacerVisibleCarrito();
}
function agregarItemCarrito(titulo, precio, imgSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i = 0; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }
    var itemCarritoContenido = `
    <div class="carrito-item">
    <img src="${imgSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
      <span class="carrito-item-titulo">${titulo}</span>
      <div class="selector-cantidad">
        <i class="fa-solid fa-minus restar-cantidad"></i>
        <input type="text" value="1" class="carrito-item-cantidad" disabled>
        <i class="fa-solid fa-plus sumar-cantidad"></i>
        <span class="carrito-item-precio">${precio}</span>
      </div>
    </div>
    <span class="btn-eliminar">
      <i class="fa-solid fa-trash"></i>
    </span>
  </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItem);
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);
    actualizarTotal();


}

function hacerVisibleCarrito(){
    carritoVisible = true
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1'

}