function addtocart(product){
    /* Funcion que se ejecuta cada que se añaden los productos pasando como parametro el objeto del producto seleccionado*/
    const memory =JSON.parse(localStorage.getItem("NLYZ"));
    /*parseamos la memoria del navegador a un archivo JSON que contiene el array 
    de los productos añadidos al carrito y lo asignamos a la constante memoria*/
    if(!memory){
        /*Si la memoria no esta definida se declara y se almacena en la memoria del navegador*/
        const newProduct = GetNewProductForMemory(product);
        localStorage.setItem("NLYZ",JSON.stringify([newProduct]));
    }else{
        const index_product = memory.findIndex(product_x => product_x.Id_producto === product.Id_producto);
        /*Si esta declarada la memoria obtenemos el indice del producto*/
        const newmemory = memory;
        if(index_product === -1){
            newmemory.push(GetNewProductForMemory(product));
            /*Si no se encontro el producto en la memoria se agrega al arreglo*/
        }else{
            newmemory[index_product].quantity ++;
            /*Si se encuentra aumentamos la cantidad en 1*/
        }
        localStorage.setItem("NLYZ",JSON.stringify(newmemory));
        /*Guardamos los cambios en la memoria del navegador*/
    }
    // Crear el elemento de alerta
const alert = document.createElement('div');
alert.innerHTML = `
    <div class=" alert-style" >
       <i class="bi bi-check2-circle"></i> Producto agregado
    </div>
`;

// Obtener el elemento donde se insertará la alerta
let alert_n = document.getElementById('alert-n');

// Asegurarse de que el elemento exista
if (alert_n) {
    // Agregar la alerta al elemento
    alert_n.appendChild(alert);

    // Remover la alerta después de 2 segundos
    setTimeout(() => {
        alert.remove();
    }, 2500);
} else {
    console.error('El elemento con id "alert-n" no se encontró.');
}

    UpdateNumberCart();

}

function reducetocart(product){
    /* Funcion que se ejecuta cada que reduce una cantidad del producto pasando como parametro el objeto del producto seleccionado*/
    const memory =JSON.parse(localStorage.getItem("NLYZ"));//Obtenemos el array del carrito parseado a un archivo JSON
    const index_product = memory.findIndex(product_x => product_x.Id_producto === product.Id_producto); 
    //Buscamos el indice del producto a reducir
    if(memory[index_product].quantity === 1){
        //Si la cantidad del producto es uno se elimina de la memoria
        memory.splice(index_product,1);
    }else{
        memory[index_product].quantity--;
        //Si es mayor a 1 se resta una catidad.
    }
    localStorage.setItem("NLYZ", JSON.stringify(memory));
    //Se guardan los cambios a la memoria
    UpdateNumberCart();
    //Actualizamos el elemento SPAN
}

/*-- Toma un producto, le agrega una cantidad y lo devuelve --*/
function GetNewProductForMemory(product){
    const newProduct = product;
    newProduct.quantity = 1;
    return newProduct;
}

const CountCartElement = document.getElementById('Cart_counter');

function UpdateNumberCart(){ 
    //Actualiza el elemento SPAN del carrito que indica cuantos elementos hay en el carrito
    const memory =JSON.parse(localStorage.getItem("NLYZ"));
    //Obtenemos la memoria del carrito almacenada en el almacenamoento local
    if(memory && memory.length > 0){
        //Si hay memoria guardada y si existe la memoria
        const count = memory.reduce((acum, current) => acum + current.quantity,0);
        //conatmos todos los elementos añadidos en la propiedad quantity de cada objeto
        CountCartElement.innerText = count;
        //actualizamos numero
    }else{
        //actualizamos numero a 0 si no existe o esta vacia 
        CountCartElement.innerText = 0;
    }
}

UpdateNumberCart();
//Actualizamos el numero del carrito una vez cargada la pagina