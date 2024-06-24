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
                    botonmodificar.innerHTML = ' <i class="bi bi-arrow-up-circle"></i> Modificar';
                    botonmodificar.className = 'btn btn-outline-dark btn-modificar btn-sm';
                    botonmodificar.setAttribute('value', element.Id_producto); // Agregar el atributo value con el correo electrónico
                    btn_row.appendChild(botonmodificar);
                    product_x_row.appendChild(btn_row);

            product_table.appendChild(product_x_row);
            })

            // Agregar evento clic a todos los botones de modificar
            const botonesmodificar = document.querySelectorAll('.btn-modificar');
            botonesmodificar.forEach(boton => {
                boton.addEventListener('click', mod_form);
            });
    }

    get_products();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */

    function mod_form(){  
        console.log('function')  
        const confirmar = confirm('¿Desea modificar este Producto?');

        if (confirmar) {
            // Obtener datos del usuario seleccionado
            const row_product = event.target.closest('tr');
            const id = row_product.querySelector('td:nth-child(1)').textContent;
            const nom = row_product.querySelector('td:nth-child(2)').textContent;
            const desc = row_product.querySelector('td:nth-child(3)').textContent;
            const tipo = row_product.querySelector('td:nth-child(4)').textContent;
            const precio = row_product.querySelector('td:nth-child(5)').textContent;
            const cantidad = row_product.querySelector('td:nth-child(6)').textContent;
            const color = row_product.querySelector('td:nth-child(7)').textContent;
            const Talla = row_product.querySelector('td:nth-child(8)').textContent;
            const marca = row_product.querySelector('td:nth-child(9)').textContent;
            const imagen = row_product.querySelector('td:nth-child(10)').textContent;
    
            // Llenar automáticamente los inputs del formulario
            document.getElementById('id_p').value = id;
            document.getElementById('nom_p').value = nom;
            document.getElementById('desc_p').value = desc;
            document.getElementById('price_product').value = precio;
            document.getElementById('type_p').value = tipo;
            document.getElementById('m__product').value = marca;
            document.getElementById('color_product').value = color;
            document.getElementById('size_product').value = Talla;
            document.getElementById('cant_product').value = cantidad;
            //document.getElementById('desc_p').value = rolUsuario;
    
            // Mostrar el formulario de modificar
            const formularioModificar = document.getElementById('mod_form');
            formularioModificar.style.display = 'block';
    
            // Ocultar la tabla
            const tabla_p = document.querySelector('.table');
            tabla_p.style.display = 'none';
        }
    }

    function handle_cancel_mod(){
        let form = document.getElementById('mod_form');
        form.reset();
        form.style.display= 'none';
        // mostrar la tabla
        const tabla_p = document.querySelector('.table');
        tabla_p.style.display = 'block';

        get_products();
    }

    let cancel_mod = document.getElementById('cancel-mod').addEventListener('click', handle_cancel_mod)
})