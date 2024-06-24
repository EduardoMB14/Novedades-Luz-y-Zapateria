//-------LIBRERIAS Y CONFIGURACION DE CARPETAS---------//

//- invocamos a express
const express = require('express');
const app = express();

//Invocamos a Multer
const multer = require('multer');
const fs = require('fs');

const path = require('path');

//invocamos a nodemailer
//const nodemailer = require('nodemailer')

//-Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// - Invocamos el modulo de conexion de la BD
const connection = require('./Database/db');
const { get } = require('http');

// - Motor de plantillas
app.set('view engine', 'ejs');

// - Invocar a bcryptjs
const bcryptjs = require('bcryptjs');

// - sesion var
const sesion = require('express-session');
const { ifError } = require('assert');
const { register } = require('module');
const session = require('express-session');
const { error } = require('console');
app.use(sesion({
    secret: 'secret',
    resave: true, 
    saveUninitialized: true
}));

// - seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// -configurar el directorio public para procesamiento de imagenes, css y fuentes
app.use('/resources', express.static('Public'));
app.use('/resources', express.static(__dirname + '/Public'));

// -configurar el directorio scripts para procesamiento de archivos y funcionamiento frontend
app.use('/scripts', express.static('js'));
app.use('/scripts', express.static(__dirname + '/scripts'));

// -configurar el directorio  para procesamiento de imagenes
app.use('/source', express.static('source'));
app.use('/source', express.static(__dirname + '/source'));

// Directorio de Multer /IMG_Products 
const upload = multer({ dest: 'source/' }); // Directorio donde se guardarán temporalmente los archivos


// Middleware de autenticación
function checkAuthenticated(req, res, next) {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect('/login');
    }
}

//-------CIERRE DE LIBRERIAS Y CONFIGURACION DE CARPETAS---------//


// ALERTAS //
// Función para renderizar el mensaje de alerta
function renderAlert(req, res, page, title, message, icon, showConfirmButton, timer, ruta) {
    if (req.session) {
        res.render(page, {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user,
            alert: true,
            alertTitle: title,
            alertMessage: message,
            alertIcon: icon,
            showConfirmButton: showConfirmButton,
            timer: timer,
            ruta: ruta
        });
    } else {
        res.render(page, {
            alert: true,
            alertTitle: title,
            alertMessage: message,
            alertIcon: icon,
            showConfirmButton: showConfirmButton,
            timer: timer,
            ruta: ruta
        });
    }
}
//___________________//

//__________________________RUTAS DE ACCESO_______________________//
//login
app.get('/login', (req, res)=>{
    res.render('login');
});

//Registrarse
app.get('/registrarse', (req, res)=>{
    res.render('register');
});

//Registrarse
app.get('/car', (req, res)=>{
    res.render('car');
});

//Pass
app.get('/password-m', (req, res)=>{
    res.render('pass');
});

//CIERRE DE SESION 
app.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
})

//Raiz 
app.get('/', checkAuthenticated, (req, res)=>{
    res.render('Index', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Playeras
app.get('/Playeras', checkAuthenticated, (req, res) => {
    res.render('t_shirts', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Pantalones
app.get('/Pantalones', checkAuthenticated, (req, res) => {
    res.render('jeans', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Ropa interior
app.get('/Ropa-interior', checkAuthenticated, (req, res) => {
    res.render('underwear', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Calzado
app.get('/Calzado', checkAuthenticated, (req, res) => {
    res.render('shoes', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Carrito
app.get('/Carrito-de-compras', checkAuthenticated, (req, res) => {
    res.render('cart', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Más información
app.get('/Sobre-nosotros', checkAuthenticated, (req, res) => {
    res.render('more_info', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});

// Contacto
app.get('/Contacto', checkAuthenticated, (req, res) => {
    res.render('contact', {
        login: true,
        name: req.session.name,
        email: req.session.email,
        user: req.session.user
    });
});



//Agregar productos
app.get('/Agregar_productos', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('add_products', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Resvisar_Productos
app.get('/Resvisar_Productos', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('products_r', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Resvisar_Usuarios
app.get('/Resvisar_Usuarios', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('user_list', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Pagina de administrador
app.get('/admin_page', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('admin_page', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});


//Eliminar productos
app.get('/Eliminar_productos', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('delete_products', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Actualizar productos
app.get('/Actualizar_productos', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('update_products', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Eliminar-Usuarios
app.get('/Eliminar-Usuarios', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('delete_user', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//Actualzar usuarios
app.get('/Modificar-Usuarios', checkAuthenticated, (req, res) => {
    if (req.session.user == "admin"){
        res.render('update_user', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }else{
        res.render('index', {
            login: true,
            name: req.session.name,
            email: req.session.email,
            user: req.session.user
        });
    }
});

//_______________________________________________________________________//


/*--------     Obtener los productos por categorias    -------------*/
//Obtener productos -generales
app.get('/Obtener_productos', (req, res) =>{
    const query = `
    SELECT * 
    FROM productos 
 
    `;

    connection.query(query, (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 'index', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, '');
        } else {
        //console.log(products);
          res.json(products);
        }
      });
});

const query_type = `SELECT * FROM productos WHERE cantidad >= 1 AND tipo = ? `;

//Obtener productos -Calzado
app.get('/get_shoes', (req, res) => {
    
    const tipo = 'shoes';

    connection.query(query_type, [tipo], (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 'shoes', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, 'Calzado');
        } else {
            console.log(products);
          res.json(products);
        }
    });
});

//Obtener productos -Pantalones
app.get('/get_jeans', (req, res) =>{
    const tipo = 'jeans';

    connection.query(query_type, [tipo], (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 'jeans', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, 'Pantalones');
        } else {
            console.log(products);
          res.json(products);
        }
      });
});

//Obtener productos -Ropa Interior
app.get('/get_underwear', (req, res) =>{

    const tipo = 'underwear';

    connection.query(query_type, [tipo], (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 'underwear', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, 'Ropa-interior');
        } else {
            console.log(products);
          res.json(products);
        }
      });
});

//Obtener productos -Playeras
app.get('/get_t_shirts', (req, res) =>{
    const tipo = 't_shirts';

    connection.query(query_type, [tipo], (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 't_shirts', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, 'Playeras');
        } else {
            console.log(products);
          res.json(products);
        }
      });
});

//_______________________________________________________________________//


app.get('/Obtener_usuarios', (req, res) =>{
    const query = `
    SELECT * 
    FROM login 
    `;

    connection.query(query, (error, products) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          renderAlert(req, res, 'index', "Error", "! ERROR INTERNO EN EL SERVIDOR ¡", 'error', true, false, '');
        } else {
        //console.log(products);
          res.json(products);
        }
      });
});

// Registrarse
app.post('/register_form', async (req, res) => {
    const Nombre = req.body.nom;
    const Email = req.body.email;
    const Password = req.body.pass;
    const Rol = 'user';

    // Validar información
    if (Nombre && Email && Password) {
        // Verificar que el correo no haya sido usado antes
        connection.query('SELECT * FROM login WHERE Correo = ?', [Email], async (error, results) => {
            if (error) {
                console.log(error);
                // Renderizar página con mensaje de error
                renderAlert(req, res, 'register', "Error", "Error en la base de datos", 'error', true, false, "registrarse");
            } else {
                if (results.length > 0) {
                    // El correo electrónico ya está en uso
                    renderAlert(req, res, 'register', "Error", "El correo electrónico ya se encuentra en uso", 'warning', true, false, "registrarse");
                } else {
                    // Hacer el registro
                    let passwordHash = await bcryptjs.hash(Password, 8);
                    connection.query('INSERT INTO login SET ?', { Nombre: Nombre, Correo: Email, Contrasena: passwordHash, Rol: Rol }, async (error, results) => {
                        if (error) {
                            console.log(error);
                            // Renderizar página con mensaje de error
                            renderAlert(req, res, 'register', "Error", "Error en la base de datos", 'error', true, false, "registrarse");
                        } else {
                            // Renderizar página con mensaje de éxito
                            renderAlert(req, res, 'register', "Registro", "Registro exitoso", 'success', false, 1500, "login");
                        }
                    });
                }
            }
        });
    }
});

//pass_recovery
app.post('/pass_recovery', (req , res)=>{
    const new_pass = req.body.pass;
    const email = req.body.email;

    let query = `
    SELECT * FROM login WHERE Correo = ?
    `

    if (new_pass && email) {
        connection.query(query, [email], async (error, response) =>{
            if(error){
                // Renderizar página con mensaje de error
                renderAlert(req, res, 'pass', "Error", "Error en la base de datos", 'error', true, false, "password-m");
            }else{
                if(response.length > 0 ){
                    let passwordHash = await bcryptjs.hash(new_pass, 8);
                    connection.query('UPDATE login SET Contrasena = ? WHERE Correo = ? ', [passwordHash,email], async  (error, results) =>{
                        if(error){
                             renderAlert(req, res, 'pass', "Error", "Error en la base de datos", 'error', true, false, "password-m");
                             console.log(error);
                        }else{
                             renderAlert(req, res, 'pass', " ", "Contraseña actualizada exitosamente", 'success', true, false, "login");
                             console.log(results);
                        }
                    })
                }else{
                    renderAlert(req, res, 'pass' , 'Error', "No se enccontro una cuenta con el email vinculado", 'error', true, false, "password-m" );
                }  
            }
        })
    }

})

//  - Autenticación
app.post('/auth', async (req, res) => {
    const user = req.body.email;
    const Password = req.body.pass;

    if (user && Password) {
        connection.query('SELECT * FROM login WHERE Correo = ?', [user], async (error, results) => {
            if (error) {
                console.log(error);
                // Renderizar página con mensaje de error
                renderAlert(req, res, 'login', "Error", "Error en la base de datos", 'error', true, false, "login");
            } else {
                if (results.length === 0 || !(await bcryptjs.compare(Password, results[0].Contrasena))) {
                    renderAlert(req, res, 'login', "Error", "Correo y/o contraseña incorrectas", 'error', true, false, 'login');
                } else {
                    req.session.loggedin = true;
                    req.session.user = results[0].Rol;
                    req.session.name = results[0].Nombre;
                    req.session.email = user; // Almacena el correo electrónico en la sesión
                    renderAlert(req, res, 'login', "", "", 'success', false, 1000, '');
                }
            }
        });
    } else {
        renderAlert(req, res, 'login', "Advertencia", "! Por favor ingrese un usuario y/o contraseña ¡", 'warning', true, false, 'login');
    }
});

//Agregar productos
app.post('/agregar-producto', upload.single('Imagen'), (req, res) =>{
    let file = req.file;
    let imagePath = save_file(file);
    const Nombre = req.body.nom_product;
    const Descripcion = req.body.desc_product;
    const color = req.body.color_product;
    const Talla = req.body.size_product;
    const precio = req.body.price_product;
    const tipo = req.body.type_product;
    const marca = req.body.m__product;
    const cantidad = req.body.cant_product;


    connection.query('INSERT INTO productos SET ?', {
        Nombre: Nombre, imagen: imagePath, tipo: tipo, Marca:marca,
        Color: color, Talla:Talla, Precio: precio, 
        descripcion: Descripcion, cantidad: cantidad
    }, async (error, results) =>{
        if(error){
            console.log(error);
            renderAlert(req, res, 'add_products', "Error", "Error en la base de datos", 'error', true, false, "Agregar_productos");
        }else{
            renderAlert(req, res, 'add_products', "", "Producto agregado al sistema", 'success', true, false, "Agregar_productos");
            console.log(results);
        }
    })
})

//Procesar imagenes
function save_file(file) {
    const newPath = `source/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

//update-producto
app.post('/update-producto-m' , (req, res)=>{
    const id = req.body.id_product;
    const Nombre = req.body.nom_product;
    const desc_product = req.body.desc_product;
    const price_product = req.body.price_product;
    const type_product = req.body.type_product;
    const m__product = req.body.m__product;
    const color_product = req.body.color_product;
    const size_product = req.body.size_product;
    const cant_product = req.body.cant_product;

    let query = `
    UPDATE productos SET Nombre = ?, tipo = ?, Marca = ?, 
    Color = ?, Talla = ?, Precio = ?, descripcion = ?, cantidad = ?
    WHERE Id_producto = ? 
    `;

    connection.query(query, [Nombre,type_product,m__product,color_product,
        size_product,price_product, desc_product, cant_product, id],  (error, results )=>{
        if(error){
            renderAlert(req, res, 'update_products', "Error", "Error en la base de datos", 'error', true, false, "Actualizar_productos");
            console.log(error);
        }else{
            renderAlert(req, res, 'update_products', "", "Producto actualizado", 'success', true, false, "Actualizar_productos");
            console.log(results);
        }
    })

})

// Endpoint para eliminar un producto
app.get('/delete-p_mod', (req, res) => {
    let id = req.query.id;

    // Primero, obtén la ruta de la imagen del producto de la base de datos
    const selectQuery = 'SELECT imagen FROM productos WHERE Id_producto = ?';

    connection.query(selectQuery, [id], (selectError, selectResults) => {
        if (selectError) {
            console.log(selectError);
            res.status(500).json({ error: 'Error al obtener la ruta de la imagen' });
        } else if (selectResults.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            let imagePath = selectResults[0].imagen;
            let fullImagePath = path.join(__dirname, imagePath);

            // Imprime la ruta completa de la imagen para depuración
            console.log('Ruta de la imagen a eliminar:', fullImagePath);

            // Verifica si el archivo existe antes de intentar eliminarlo
            fs.access(fullImagePath, fs.constants.F_OK, (accessError) => {
                if (accessError) {
                    console.log('El archivo no existe:', fullImagePath);
                    res.status(404).json({ error: 'Imagen no encontrada' });
                } else {
                    // Eliminar el archivo de imagen
                    fs.unlink(fullImagePath, (unlinkError) => {
                        if (unlinkError) {
                            console.log(unlinkError);
                            res.status(500).json({ error: 'Error al eliminar la imagen' });
                        } else {
                            // Eliminar el producto de la base de datos
                            let deleteQuery = 'DELETE FROM productos WHERE Id_producto = ?';

                            connection.query(deleteQuery, [id], (deleteError, deleteResults) => {
                                if (deleteError) {
                                    console.log(deleteError);
                                    res.status(500).json({ error: 'Error al eliminar el producto' });
                                } else {
                                    console.log(deleteResults);
                                    res.json({ success: true, results: deleteResults });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//Eliminar Usuarios
app.get('/delete-us_mod', (req, res) => {
    let email = req.query.email;
    let query = `
    DELETE FROM login WHERE Correo = ?
    AND Rol != 'admin'
    `;

    //console.log(email);
    
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
        } else {
            console.log(results);
            if (results.affectedRows > 0) {
                res.json({ message: 'Usuario eliminado exitosamente' });
            } else {
                res.status(404).json({ error: 'Usuario no encontrado o es administrador' });
            }
        }
    });
});

//update-user-mod
app.post('/update-user-mod' , (req, res) => {
    const Nombre = req.body.nom_user;
    const Correo = req.body.Correo_user;
    const Rol = req.body.Rol_user;

    let query = `
        UPDATE login SET Nombre = ?, Correo = ?, Rol = ?
        WHERE Correo = ?
    `;

    console.log(Nombre)
    console.log(Correo)
    console.log(Rol)

    connection.query(query, [Nombre, Correo, Rol, Correo], (error, response)=>{
        if(error){
            console.log(error);
            renderAlert(req, res, 'update_user', "Error", "Error en la base de datos", 'error', true, false, "Modificar-Usuarios");
        }else{
            console.log(response);
            renderAlert(req, res, 'update_user', "", "Usuario actualizado correctamente", 'success', true, false, "Modificar-Usuarios");
        }
    })
});

// Middleware para manejar rutas no encontradas para páginas
app.use((req, res, next) => {
    // Verificar si la ruta es para una página
    if (req.accepts('html')) {
        res.status(404).render('404'); // Renderizar la página 404
    } else {
        // Si no es una página, pasar al siguiente middleware
        next();
    }
});

// Middleware para manejar rutas no encontradas para otros elementos (como API)
app.use((req, res) => {
    // Aquí puedes manejar rutas no encontradas para otros elementos, como APIs
    res.status(404).json({ error: 'Ruta no encontrada' });
});

//Escuchar la app en el puerto 3000
app.listen(3000,(req, res)=> {
    console.log('SERVER US RUNNING IN http://localhost:3000');
})
