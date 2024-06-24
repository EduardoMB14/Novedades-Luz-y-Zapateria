document.addEventListener('DOMContentLoaded',function(){
    let sources_products = [];

    function get_products(){
        fetch('/get_t_shirts')
        .then ( res => res.json() )
        .then (response_products => {
            sources_products = response_products;
            if(sources_products.length >= 1){
              generate_products();
            }else{
              NAN_products();
            }
        })
    }

    function generate_products(){
        let product_list = document.getElementById('Product-list');

        sources_products.forEach(element => {
        let product_x = document.createElement('div')
        product_x.classList.add('product-x');

            product_x.innerHTML= `
            <div class="img_center">
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
              <div style='width:100%;'> Marca</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Marca}</div>
            </div>
            <div class="divider"></div>
            <div class="order_info">
              <div style='width:100%;'> Talla</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Talla}</div>
            </div>
            <div class="divider"></div>
            <div class="order_info">
              <div style="width:100%; "> Color</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Color}</div>
            </div>
            <div class="divider"></div>
            <div class="order_info">
              <div style="width:100%; "> Disponibles</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.cantidad}</div>
            </div>
          </div>
          <br>
          <button class="btn btn-dark btn_100" id='btn_add'>
            <i class="bi bi-cart4"></i> &nbsp; Añadir al carrito
          </button>
            `;
            product_list.appendChild(product_x);
            product_x.getElementsByTagName("button")[0].addEventListener("click", ()=> addtocart(element))
        });
    }

    get_products();
})


function NAN_products(){
  let empty = document.getElementById('empty');
  empty.style.display = 'flex';
}