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
        let product_list = document.getElementById('Product-list');
        /* Obtenemos el contenedor de los productos mediante su Id */

        sources_products.forEach(element => {
          /* Comenzamos un ciclo para cada elemento del arreglo de objetos representados por productos */
        let product_x = document.createElement('div')
        product_x.classList.add('product-x');
        /* Creamos el elemento DIV y le añadimos la clase product-x para estilizar las cards */

            product_x.innerHTML= `
         <div class="">
            <img
              src='${element.imagen}'
              class="IMG-Product"
              alt="IMG-Product"
            />
          </div>
          <div class="product-info">
            <h5 class="card-title h5"><strong>${element.Nombre}</strong></h5>
            <p class="price">$ ${element.Precio} Mxn</p>
            <!--la etiqueta em resalta el texto-->
            <div class="divider"></div>
            <div class="order_info">
              <div style='width:100%;'> Talla</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Talla}</div>
            </div>
            <div class="divider"></div>
            <div class="order_info">
              <div style="width:100%; "> Color</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Color}</div>
            </div>
            <!-- Resalta el contenido con una linea para el marcado basico  -->
            <div class="divider"></div>
          </div>
          <br />
          <button class="btn btn-dark btn_100">
            <i class="bi bi-cart4"></i> &nbsp; Añadir al carrito
          </button>
            `;
            /* Asignamos codigo HTML al elemento DIV creado */
            product_list.appendChild(product_x);
              /* agregamos el codigo asignado abriendo el DOM y añadiendo el Div creado */
            product_x.getElementsByTagName("button")[0].addEventListener("click", ()=> addtocart(element))
            /* Para cada Div creado se añadira en evento de clicks que llamara a la funcion addtccart pasando la 
            informacion del producto requerido
            
            la funcion se enuentra en otro archivo js que tambien sera cargado en la pagina*/
        });
    }

    get_products();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */
})