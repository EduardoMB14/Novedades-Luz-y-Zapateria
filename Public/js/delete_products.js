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
        let product_x_row = document.createElement('tr')

            let Id_producto = document.createElement('td');
            Id_producto.textContent= element.Id_producto;
            product_x_row.appendChild(Id_producto);

            let nom = document.createElement('td');
            nom.textContent= element.Nombre;
            product_x_row.appendChild(nom);

            let descripcion = document.createElement('td');
            descripcion.textContent= element.descripcion;
            product_x_row.appendChild(descripcion);

            let tipo = document.createElement('td');
            tipo.textContent= element.tipo;
            product_x_row.appendChild(tipo);

            let precio = document.createElement('td');
            precio.textContent= element.Precio;
            product_x_row.appendChild(precio);

            let cantidad = document.createElement('td');
            cantidad.textContent= element.cantidad;
            product_x_row.appendChild(cantidad);

            let Color = document.createElement('td');
            Color.textContent= element.Color;
            product_x_row.appendChild(Color);

            let Talla = document.createElement('td');
            Talla.textContent= element.Talla;
            product_x_row.appendChild(Talla);
            
            let Marca = document.createElement('td');
            Marca.textContent= element.Marca;
            product_x_row.appendChild(Marca);

            let row_img = document.createElement('td')

            let img = document.createElement('img');
            img.src= element.imagen

            row_img.appendChild(img);

            product_x_row.appendChild(row_img);

            let btn_row = document.createElement('td');
            const botonmodificar = document.createElement('button');
                    botonmodificar.innerHTML = ' <i class="bi bi-trash3"></i> Eliminar';
                    botonmodificar.className = 'btn btn-dark modificar btn-sm';
                    botonmodificar.setAttribute('value', element.Id_producto); // Agregar el atributo value con el correo electrónico
                    btn_row.appendChild(botonmodificar);
                    product_x_row.appendChild(btn_row);

            product_table.appendChild(product_x_row);
            })

            // Agregar evento clic a todos los botones de modificar
            const botonesmodificar = document.querySelectorAll('.modificar');
            botonesmodificar.forEach(boton => {
                boton.addEventListener('click', mod_form);
            });
    }

    get_products();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */

    function mod_form(){  
        const confirmar = confirm('¿Desea eliminar este Producto?');

        if (confirmar) {
            // Obtener datos del usuario seleccionado
            const row_product = event.target.closest('tr');
            const id = row_product.querySelector('td:nth-child(1)').textContent;

                  fetch(`/delete-p_mod?id=${encodeURIComponent(id)}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json(); // Parsea la respuesta si es un JSON
                        }
                        throw new Error('La solicitud de eliminación falló.');
                    })
                    .then(data => {
                        Swal.fire({
                            title: 'Producto eliminado',
                            text: data.message, 
                            icon: 'success',
                            showConfirmButton: true
                        });
                        get_products();
                    })
                    .catch(error => {
                        console.error('Error al eliminar', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar el producto. Por favor, intenta nuevamente más tarde.',
                            icon: 'error',
                            showConfirmButton: true,
                        });
                    });
        }
    }
})