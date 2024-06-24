document.addEventListener("DOMContentLoaded", function() {

    // Obtén todos los botones con la clase 'btn_nav'
    let botones = document.querySelectorAll('.btn_nav');

    // Añade un event listener a cada botón
    botones.forEach((boton) => {
        boton.addEventListener('click', (event) => {

            // Muestra un mensaje en la consola con el valor del botón clicado
            console.log('Has hecho clic en el botón: ' + event.target.value);

            // Obtiene todos los elementos con la clase 'info' (los artículos)
            let articles = document.querySelectorAll('.info');

            // Oculta todos los artículos estableciendo su estilo display a 'none'
            articles.forEach((article) => {
                article.style.display = 'none';
            });

            // Obtiene el valor del botón clicado (presumiblemente el id del artículo a mostrar)
            let articleId = event.target.value;

            // Selecciona el artículo correspondiente al id obtenido
            let articleToShow = document.getElementById(articleId);

            // Muestra el artículo correspondiente cambiando su estilo display a 'block'
            articleToShow.style.display = 'block';
        });
    });
});