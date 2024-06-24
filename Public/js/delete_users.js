document.addEventListener('DOMContentLoaded',function(){  //Ejecutar codigo una vez cargado el DOM de HTML
    let source = []; 
    /*Arreglo donde almacenaremos los productos*/

    /*Funcion que obtiene los productos*/
    function get_users(){ 
      /* Hacemos una solicitud fetch al servidor para traer los productos de la BD, esta se recive en un entorno
      de node mediante un endpoint o API Rest */
      fetch('/Obtener_usuarios')
        .then ( res => res.json() ) /* parseamos la respuesta a un archivo JSON */
        .then (response_users => { 
            source = response_users; /* Asignamos la respuesta al arreglo de productos */
            generate_users();
            /* Llamamos a la funcion que generara las Cards de los productos */
        })
    }

    function generate_users(){
      /* funcion que generara las Cards de los productos */
        let product_users = document.getElementById('table');
        /* Obtenemos el contenedor de los productos mediante su Id */

        source.forEach(element => {
          /* Comenzamos un ciclo para cada elemento del arreglo de objetos representados por productos */
        let user_row = document.createElement('tr')

            let Nombre = document.createElement('td');
            Nombre.textContent = element.Nombre;
            user_row.appendChild(Nombre);

            let Correo = document.createElement('td');
            Correo.textContent = element.Correo;
            user_row.appendChild(Correo);

            let Rol = document.createElement('td');
            Rol.textContent = element.Rol;
            user_row.appendChild(Rol);

            let Contrasena = document.createElement('td');
            Contrasena.textContent = element.Contrasena;
            user_row.appendChild(Contrasena);
            
            let btn_row = document.createElement('td');
            const btn_delete = document.createElement('button');
            btn_delete.innerHTML = ' <i class="bi bi-trash3"></i> Eliminar';
                    btn_delete.className = 'btn btn-dark modificar btn-sm';
                    btn_delete.setAttribute('value', element.Correo); // Agregar el atributo value con el correo electrónico
                    btn_row.appendChild(btn_delete);
                    user_row.appendChild(btn_row);

            product_users.appendChild(user_row);
        });

        // Agregar evento clic a todos los botones de modificar
        const btn_del_Element = document.querySelectorAll('.modificar');
        btn_del_Element.forEach(boton => {
            boton.addEventListener('click', del_user);
        });

    }

    get_users();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */

    function del_user(event) {
        const confirmar = confirm('¿Desea eliminar este Usuario?');
    
        if (confirmar) {
            // Obtener datos del usuario seleccionado
            const row_product = event.target.closest('tr');
            const correo = row_product.querySelector('td:nth-child(2)').textContent;
    
            fetch(`/delete-us_mod?email=${encodeURIComponent(correo)}`)
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parsea la respuesta si es un JSON
                    }
                    throw new Error('La solicitud de eliminación falló.');
                })
                .then(data => {
                    Swal.fire({
                        title: 'Usuario eliminado',
                        text: data.message, 
                        icon: 'success',
                        showConfirmButton: true
                    });
                    setTimeout(()=>{
                        location.reload;
                    })
                })
                .catch(error => {
                    console.error('Error al eliminar', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el usuario, o el usuario es administrador. Por favor, intenta nuevamente más tarde.',
                        icon: 'error',
                        showConfirmButton: true,
                    });
                });
        }
    }
    

})