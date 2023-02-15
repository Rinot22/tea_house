let pageIndex = 1;
fetch("/public/html/components/carousel.html")
    .then(response => response.text())
    .then(carouselData => {
        var parser = new DOMParser();
        var html = parser.parseFromString(carouselData, 'text/html');
        let slideshowContainer = html.querySelector(".slideshow-container");
        let dotsContainer = html.querySelector(".dots");
        fetch("/public/mock/data.json")
            .then(response => response.json())
            .then(data => {
                fetch("/public/html/components/tea-card.html")
                    .then(response => response.text())
                    .then(teaCardData => {
                        var parser = new DOMParser();
                        var cardHtml = parser.parseFromString(teaCardData, 'text/html');
                        let teaCard = cardHtml.querySelector(".tea-card");
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
                        
                        let teaCardsReaaranged = [];
                        let tmpArr = [];
                        for (let index = 0; index < teaCards.length; index++) {
                            const element = teaCards[index];
                            tmpArr.push(element);
                            if (tmpArr.length % 6 == 0) {
                                teaCardsReaaranged.push(tmpArr);
                                tmpArr = [];
                            }
                        }
                        if (tmpArr.length > 0) teaCardsReaaranged.push(tmpArr);
                        let slide = parser.parseFromString('<div class="mySlides fade"></div>', 'text/html').querySelector(".mySlides");
                        let slides = [];
                        let dots = [];
                        let j = 1;
                        for (const element of teaCardsReaaranged) {
                            let slideTmp = slide?.cloneNode(true);
                            element.forEach(child => slideTmp?.appendChild(child));
                            slides.push(slideTmp);
                            dots.push(
                                parser.parseFromString(`<span class="dot" onclick="currentPage(${j})"></span>`, 'text/html').querySelector(".dot")
                            );
                            j += 1;
                        }
                        slideshowContainer?.querySelectorAll(".prev, .next").forEach(elem => elem.remove());
                        slides.forEach(elem => slideshowContainer.appendChild(elem));
                        document.getElementById("products")?.appendChild(slideshowContainer);
                        document.querySelector(".products__nav")?.appendChild(dotsContainer);
                        dots.forEach(elem => {
                            document.querySelector(".products__nav .dots")?.appendChild(elem);
                        });
                        showPages(pageIndex);
                    })
            });
    });

function sort() {
    fetch("/public/html/components/carousel.html")
        .then(response => response.text())
        .then(carouselData => {
            var parser = new DOMParser();
            var html = parser.parseFromString(carouselData, 'text/html');
            let slideshowContainer = html.querySelector(".slideshow-container");
            let dotsContainer = html.querySelector(".dots");
            fetch("/public/mock/data.json")
                .then(response => response.json())
                .then(data => {
                    fetch("/public/html/components/tea-card.html")
                        .then(response => response.text())
                        .then(teaCardData => {
                            var parser = new DOMParser();
                            var cardHtml = parser.parseFromString(teaCardData, 'text/html');
                            let teaCard = cardHtml.querySelector(".tea-card");
                            let teaCards = [];
                            let dataNew = [];
                            data = data.filter(elem => elem.price <= Number(document.getElementById("price__range").value));
                            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {

                                if (checkbox.checked) {
                                    for (const elem of data) {
                                        if (checkbox.value == "All" && checkbox.checked) {
                                            dataNew = data;
                                            break;
                                        }
                                        if (elem.type == checkbox.value || elem.category == checkbox.value || elem.origin == checkbox.value) {
                                            dataNew.push(elem);
                                        }
                                    }
                                }
                            });
                            for (const element of dataNew) {
                                let teaCardTmp = teaCard?.cloneNode(true);
                                teaCardTmp?.querySelector("img")?.setAttribute("public", element.img);
                                teaCardTmp.querySelector(".tea-name").innerText = element.title;
                                teaCardTmp.querySelector(".tea-desc").innerText = element.desc;
                                teaCardTmp.querySelector(".tea-price").innerText = element.price;
                                teaCardTmp.querySelector(".tea-weight").innerText = element.weight;
                                teaCards.push(teaCardTmp);
                            };
                            let teaCardsReaaranged = [];
                            let tmpArr = [];
                            for (let index = 0; index < teaCards.length; index++) {
                                const element = teaCards[index];
                                tmpArr.push(element);
                                if (tmpArr.length % 6 == 0) {
                                    teaCardsReaaranged.push(tmpArr);
                                    tmpArr = [];
                                }
                            }
                            if (tmpArr.length > 0) teaCardsReaaranged.push(tmpArr);
                            let slide = parser.parseFromString('<div class="mySlides fade"></div>', 'text/html').querySelector(".mySlides");
                            let slides = [];
                            let dots = [];
                            let j = 1;
                            for (const element of teaCardsReaaranged) {
                                let slideTmp = slide?.cloneNode(true);
                                element.forEach(child => slideTmp?.appendChild(child));
                                slides.push(slideTmp);
                                dots.push(
                                    parser.parseFromString(`<span class="dot" onclick="currentPage(${j})"></span>`, 'text/html').querySelector(".dot")
                                );
                                j += 1;
                            }
                            slideshowContainer?.querySelectorAll(".prev, .next").forEach(elem => elem.remove());
                            slides.forEach(elem => slideshowContainer.appendChild(elem));
                            document.getElementById("products").innerHTML = "";
                            document.querySelector(".products__nav").innerHTML = "";
                            document.getElementById("products")?.appendChild(slideshowContainer);
                            document.querySelector(".products__nav")?.appendChild(dotsContainer);
                            dots.forEach(elem => {
                                document.querySelector(".products__nav .dots")?.appendChild(elem);
                            });
                            showPages(pageIndex);
                        })
                });
        });

}
document.getElementById("range-val").innerText = document.getElementById("price__range").value;
document.getElementById("price__range").oninput = function (e) {
    document.getElementById("range-val").innerText = e.target.value;
    sort();
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.value != "All") checkbox.onchange = function () {
        document.getElementById("all").checked = false;
        sort();
    }
});

document.getElementById("all").onchange = function () {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.value != "All") checkbox.checked = false;
    });
    sort();
};

function plusPages(n) {
    showPages(pageIndex += n);
}

function currentPage(n) {
    showPages(pageIndex = n);
}

function showPages(n) {
    let i;
    let slides = document.querySelectorAll("#products .mySlides");
    let dots = document.querySelectorAll(".products__nav .dot");
    if (n > slides.length) { pageIndex = 1 }
    if (n < 1) { pageIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" show", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[pageIndex - 1].className += " show";
    dots[pageIndex - 1].className += " active";
}



