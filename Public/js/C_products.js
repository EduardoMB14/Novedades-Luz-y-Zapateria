document.addEventListener('DOMContentLoaded',function(){  //Ejecutar codigo una vez cargado el DOM de HTML
    let sources_products = []; 
    /*Arreglo donde almacenaremos los productos*/

    /*Funcion que obtiene los productos*/
    function get_products(){ 
      /* Hacemos una solicitud fetch al servidor para traer los productos de la BD, esta se recive en un entorno
      de node mediante un endpoint o API Rest */
      fetch('/Obtener_productos')
        .then ( res => res.json() ) /* parseamos la respuesta a un archivo JSON */
        .then (response_products => { 
            sources_products = response_products; /* Asignamos la respuesta al arreglo de productos */
            generate_products();
            /* Llamamos a la funcion que generara las Cards de los productos */
        })
    }

    function generate_products(){
      /* funcion que generara las Cards de los productos */
        let product_table = document.getElementById('table');
        /* Obtenemos el contenedor de los productos mediante su Id */

        sources_products.forEach(element => {
          /* Comenzamos un ciclo para cada elemento del arreglo de objetos representados por productos */
        let product_x_row = document.createElement('tr')
        product_x_row.classList.add('na');
        /* Creamos el elemento DIV y le añadimos la clase product-x para estilizar las cards */

            product_x_row.innerHTML= `
                <td> ${element.Id_producto} </td>
                <td> ${element.Nombre} </td>
                <td> ${element.descripcion} </td>
                <td> ${element.tipo} </td>
                <td> ${element.Precio} </td>
                <td> ${element.cantidad} </td>
                <td> ${element.Color} </td>
                <td> ${element.Talla} </td>
                <td> ${element.Marca} </td>
                <td> <img  src='${element.imagen}' alt='Imagen del producto' style='width: 80px;' ></td>
            `;
            product_table.appendChild(product_x_row);
        });
    }

    get_products();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */
})