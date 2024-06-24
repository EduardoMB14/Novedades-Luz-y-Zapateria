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

            user_row.innerHTML= `
                <td> ${element.Nombre} </td>
                <td> ${element.Correo} </td>
                <td> ${element.Rol} </td>
                <td> ${element.Contrasena} </td>
            `;
            product_users.appendChild(user_row);
        });
    }

    get_users();
    /* al cargar la pagina llamamos a la funcion para obtener los productos  */
})