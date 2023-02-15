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

