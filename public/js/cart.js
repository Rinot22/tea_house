function plus(id) {
    let q = document.querySelector(`#id_${id}`).innerHTML;
    console.log(q);
    q = Number(q);
    q += 1;
    document.querySelector(`#id_${id}`).innerHTML = q;
    let p = document.querySelector(`#product__price_id_${id}`).innerHTML;
    document.querySelector(`#product__total_id_${id}`).innerHTML = p * q;
    countTotal();
}
function minus(id) {
    let q = document.querySelector(`#id_${id}`).innerHTML;
    q = Number(q);
    if (q > 1)
        q -= 1;
    document.querySelector(`#id_${id}`).innerHTML = q;
    let p = document.querySelector(`#product__price_id_${id}`).innerHTML;
    document.querySelector(`#product__total_id_${id}`).innerHTML = p * q;
    countTotal();
}

function countTotal() {
    let total = 0;
    document.querySelectorAll("tbody td:last-child").forEach(elem => total += Number(elem.innerHTML))
    document.getElementById("total").innerHTML = total;
    return total;
}

fetch("/public/mock/cart.json")
    .then(response => response.json())
    .then(data => {
        for (const element of data) {
            document.querySelector("tbody").innerHTML += `
        <tr>
            <input type="hidden" value="${element.id}">
            <td><img src="${element.img}" alt="product img"></td>
            <td>${element.weight}</td>
            <td>
                <div id="product__quantity_id_${element.id}">
                    <button class="product__quantity" id="product__quantity-minus_id_${element.id}" onclick=minus("${element.id}")>-</button>
                    <span id="id_${element.id}">${element.quantity}</span>
                    <button class="product__quantity" id="product__quantity-plus_id_${element.id}" onclick=plus("${element.id}")>+</button>
                </div>
            </td>
            <td id="product__price_id_${element.id}">${element.price}</td>
            <td id="product__total_id_${element.id}">${element.price * element.quantity}</td>
        </tr>`;
        }
        countTotal();
    });


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

document.getElementById("pay").onclick = function(){
    let data = {};
    let total = countTotal();
    data.total = total;
    data.products = [];
    let elems = document.querySelectorAll("tbody tr");
    elems.forEach(elem => {
        let product = {};
        product.id = elem.querySelector("input")?.getAttribute("value");
        product.quantity = elem.querySelector("span")?.innerHTML;
        data.products.push(product);
    })
    data.name = document.getElementById("name").value;
    data.surname = document.getElementById("surname").value;
    data.tel = document.getElementById("tel").value;
    data.email = document.getElementById("email").value;
    data.city = document.getElementById("city").value;
    data.address = document.getElementById("address").value;
    postData("/src/page.php", data);
}