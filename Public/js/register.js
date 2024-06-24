document.addEventListener('DOMContentLoaded', function(){
    let name = document.getElementById('nom');
    let email = document.getElementById('email');
    let pass = document.getElementById('pass');
    let invalid_pass = document.getElementById('invalid_pass');
    let btn_send = document.getElementById('send_button');
    //Obtenemos los elementos por la ID 

    let grid = document.createElement('div')
    //CREAMOS UN ELEMENTO DIV Y LE AÑADIMOS LA CLASE d-grid gap-2
    grid.classList='d-grid gap-2';

    let pass_valid = false;
    let email_valid = false;
    //Declaramos los verificadores de passwor y correo como falso

    pass.addEventListener('input', verify_pass);
    name.addEventListener('input', add_button);
    email.addEventListener('change', verify_email);
    //Añadimos los eventos listner a los input Password Nombre y Correo

    function verify_pass(event){
        //Revisar la contraseña
        if(pass.value.length < 8){
            //si la longitud de la contraseña es menor a 8 añadira la clase is-invalid para indicarle al usuario que esta mal
            //y asiganremos false al verificador de password
            event.preventDefault();
            pass.classList.add('is-invalid');
            invalid_pass.style.display = 'block';
            pass_valid = false;
        }else{
            pass.classList.remove('is-invalid');
            pass.classList.add('is-valid');
            invalid_pass.style.display = 'none';
            pass_valid = true;
            //Si ess mayor a 8 añade la clase is-valid y quita el div de contraseña incorrecta
            //asignamos true al verificador
        }

        if(pass.value.length == 0){
            pass.classList.remove('is-invalid');
            pass.classList.remove('is-valid');
            invalid_pass.style.display = 'none';
            pass_valid = false;

            //Evenbto por si la longitud es 0 y ya se habia añadido una antess añade is-invalid 
            //y mostramos el div de error y flase al verificador
        }
        add_button();
        //llamamos al verificador de añadir boton
    }

    function add_button(){
        /*Funcion que verifica si todos los campos son verdaderos
         con su respectiva verificacion si son validos añadimos el boton de registro*/
        if(pass_valid && name.value !== '' && email_valid){
            grid.innerHTML=`
            <button type="submit" class="btn btn-dark">
              <i class="bi bi-send-plus"> &nbsp; </i> Enviar
            </button>
            `;
            btn_send.appendChild(grid);
        }else{
            grid.innerHTML=``;
            btn_send.appendChild(grid);
            //Si no son verdaderos quitamos el boton
        }
    }

    function verify_email(event){
        //verifica que sea un email correcto o bien formulado
        event.preventDefault();//evento por defecto de js
        let array_mail = email.value; //obtenemos lo escrito por el usuario
        let hasAt = false; // Variable para rastrear si se encontró el '@'
        array_mail = array_mail.split('');//separamos el string y lo convertimos a un array por cada caracter ingresado
        if(email.value.length == ''){
            email.classList.remove('is-valid');
            email.classList.remove('is-invalid');
            email_valid = false;
            //Verificamos que no este vacio
        } else {
            //si no esta vacio empezamos un foreachn que busca si hay contenido despues del @
            array_mail.forEach(element => {
                if(element === '@'){
                    hasAt = true;
                    //si lo encuetra asigna al verificador true
                } else if (element === ' ' || element === '' || element === null) {
                    // Si hay un espacio en blanco o una cadena vacía después del '@', es inválido
                    hasAt = false;
                }
            });
            if (hasAt) {
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
                email_valid = true;
                //añadimos clases de css para indicarle al usuario que esta bien
                } else {
                email.classList.remove('is-valid');
                email.classList.add('is-invalid');
                email_valid = false;
                //añadimos clases de css para indicarle al usuario que esta mal su email
            }
        }
        add_button();
        //Llamamos al verificador para revisar que todo sea verdadero
    }
    
});
