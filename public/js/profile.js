fetch("/public/mock/order-history.json")
    .then(response => response.json())
    .then(data => {
        for (const element of data) {
            let div = `<div class="order-card">
            <div class="order__date">${element.date}</div>
            <table>
            `;
            for (const product of element.products) {
                div += `<tr>
                <td>${product.name}</td>
                <td>${product.weight}</td>
                <td>${product.quantity}x${product.price}$</td>
                <td>${product.total}</td>
            </tr>`
            }
            div += `</table>
            </div>`;
            document.getElementById("order-history").innerHTML += div;
        }
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

document.getElementById("change-personal-info").onclick = function(){
    let data = {};
    data.name = document.getElementById("name")?.innerHTML;
    data.surname = document.getElementById("surname")?.innerHTML;
    data.email = document.getElementById("email")?.innerHTML;
    data.tel = document.getElementById("tel")?.innerHTML;
    console.log(data)
    postData("/src/page.php", data);
}

document.getElementById("change-shipping-address").onclick = function(){
    let data = {};
    data.city = document.getElementById("city")?.innerHTML;
    data.address = document.getElementById("address")?.innerHTML;
    console.log(data)
    postData("/src/page.php", data);
}