const product_list = document.getElementById('Product-list');
//elemento de productos
const quantityElement = document.getElementById('total_units');
//cantidad de elementos
const priceElement = document.getElementById('total_price');
const NAN_elements = document.getElementById('NAN_elements');
const acumElement = document.getElementById('acum');
const restartCartElement = document.getElementById("restartCart");
//LLAMAMOS A LOS ELEMENTOS POR SU ID

function generate_products(){
  product_list.innerHTML = '';
    const sources_products = JSON.parse(localStorage.getItem("NLYZ"));

    if(sources_products && sources_products.length > 0){
        sources_products.forEach(element => {
            let product_x = document.createElement('div')
            product_x.classList.add('product-x');
        
                product_x.innerHTML= `
             <div class="img_container">
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
                <div class="order_info">
                  <div style='width:100%;'> Talla</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Talla}</div>
                </div>
                <div class="order_info">
                  <div style="width:100%; "> Color</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.Color}</div>
                </div>
                <div class="divider"></div>
                <div class="order_info">
                  <div style="width:100%; "> Disponibles</div> <div style='width: 100%; text-align: end; text-transform: capitalize;'>${element.cantidad}</div>
                </div>
                <br>
                <div style='width: 100%; text-align: justify;'>Descripción:&nbsp;${element.descripcion}</div>
              <br>
              <div class="btn_s">
              <button class="btn btn-sm btn-dark "> <i class="bi bi-dash-square  i "></i> </button> &nbsp; 
                 <span class="span_number">
                    ${element.quantity}
                 </span>
                 &nbsp; 
              <button class="btn btn-sm btn-dark "> <i class="bi bi-plus-square  i"></i> </button>
              </div>
              </div>
                `;

                product_list.appendChild(product_x);

                if(element.quantity >= element.cantidad){
                  let btn_plus = product_x.getElementsByTagName("button")[1].style.display = 'none';
                }else{          
                  product_x
                  .getElementsByTagName("button")[1]
                  .addEventListener("click", (e)=>{
                      addtocart(element);
                      generate_products();
                      UpdateTotal();
                  });
                }

                product_x
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e)=> {
                  reducetocart(element);
                  UpdateTotal();
                  generate_products();
                  hide_content_Empty();
                }) ;
            });
    }
}

generate_products();
UpdateTotal();

function UpdateTotal(){
  let total_quantity = 0;
  let total_price = 0;
  const sources_products = JSON.parse(localStorage.getItem("NLYZ"));
  if(sources_products && sources_products.length > 0){
    sources_products.forEach(element => {
      total_quantity += element.quantity;
      total_price += element.Precio * element.quantity;
    });
    quantityElement.innerText = total_quantity;
    priceElement.innerText = total_price;
  }
}


function hide_content_Empty(){
  const sources_products = JSON.parse(localStorage.getItem("NLYZ"));
  NAN_elements.classList.toggle("hide",sources_products && sources_products.length > 0);
  acumElement.classList.toggle("hide",!(sources_products && sources_products.length > 0));
}

hide_content_Empty();

restartCartElement.addEventListener("click",restartCart);
function restartCart(){
  localStorage.removeItem("NLYZ");
  UpdateTotal();
  generate_products();
  UpdateNumberCart();
  hide_content_Empty();
}


