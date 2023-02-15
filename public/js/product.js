fetch("/public/mock/suggestions.json")
    .then(response => response.json())
    .then(data => {
        fetch("/public/html/components/tea-card.html")
            .then(response => response.text())
            .then(teaCardData => {
                var parser = new DOMParser();
                var html = parser.parseFromString(teaCardData, 'text/html');
                let suggestionsContainer = document.getElementById("suggestions__cards");
                let teaCard = html.querySelector(".tea-card");
                let teaCards = [];
                for (const element of data) {
                    let teaCardTmp = teaCard?.cloneNode(true);
                    teaCardTmp?.querySelector("img")?.setAttribute("src", element.img);
                    teaCardTmp.querySelector(".tea-name").innerText = element.title;
                    teaCardTmp.querySelector(".tea-desc").innerText = element.desc;
                    teaCardTmp.querySelector(".tea-price").innerText = element.price;
                    teaCardTmp.querySelector(".tea-weight").innerText = element.weight;
                    teaCards.push(teaCardTmp);
                }
                teaCards.forEach(elem => suggestionsContainer?.appendChild(elem));
            })
    });

fetch("/public/mock/product.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("id")?.setAttribute("value", data.id);
        document.getElementById("product__title").innerHTML = data.name;
        document.getElementById("product__desc").innerHTML = data.desc;
        document.getElementById("product__price").innerHTML = data.price;
        document.getElementById("product__note").innerHTML = data.notes;
        document.getElementById("product__ingridients").innerHTML = data.ingridients;
        document.getElementById("product__caffeine").innerHTML = data.caffeine;
        document.getElementById("product__origin").innerHTML = data.origin;
        document.getElementById("product__weight").innerHTML = data.weight;
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

document.getElementById("add-to-cart").onclick = function (e) {
    let data = {};
    data.id = document.getElementById("id")?.getAttribute("value");
    data.desc = document.getElementById("product__desc").innerHTML;
    data.price = document.getElementById("product__price").innerHTML;
    data.notes = document.getElementById("product__note").innerHTML;
    data.ingridients = document.getElementById("product__ingridients").innerHTML;
    data.caffeine = document.getElementById("product__caffeine").innerHTML;
    data.origin = document.getElementById("product__origin").innerHTML;
    data.weight = document.getElementById("product__weight").innerHTML;
    data.quantity = document.querySelector("#product__quantity span").innerHTML;
    console.log(data);
    postData("/public/page.php", data);
};

document.getElementById("product__fav").onclick = function(e) {
    let data = {};
    data.id = document.getElementById("id")?.getAttribute("value");
    data.isFavorite = true;
    postData("/public/page.php", data);
}

document.getElementById("product__quantity-plus").onclick = function(e){
    let q = document.querySelector("#product__quantity span").innerHTML;
    q = Number(q);
    q += 1;
    document.querySelector("#product__quantity span").innerHTML = q;
}

document.getElementById("product__quantity-minus").onclick = function(e){
    let q = document.querySelector("#product__quantity span").innerHTML;
    q = Number(q);
    if (q > 1)
        q -= 1;
    document.querySelector("#product__quantity span").innerHTML = q;
}