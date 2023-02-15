let orders;
fetch("/public/mock/order.json")
    .then(response => response.json())
    .then(data => {
        for (const element of data.products) {
            document.querySelector("tbody").innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.weight}</td>
            <td>${element.quantity}x${element.price}$</td>
            <td>${element.total}</td>
        </tr>`;
        }
        document.getElementById("total").innerHTML = data.total;
        document.getElementById("address").innerHTML = data.address;
        orders = data;
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

document.getElementById("buy").onclick = function(e){
    let data = {};
    data.cardNum = document.getElementById("ccn").value;
    data.cardDate = document.getElementById("date").value;
    data.cardCvc = document.getElementById("cvc").value;
    data.orders = orders;
    console.log(data);
    postData("/src/page.php", data);
}   