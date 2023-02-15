let slideIndex = 1;
fetch("/public/html/components/carousel.html")
    .then(response => response.text())
    .then(carouselData => {
        var parser = new DOMParser();
        var html = parser.parseFromString(carouselData, 'text/html');
        let slideshowContainer = html.querySelector(".slideshow-container");
        let dotsContainer = html.querySelector(".dots");
        fetch("/public/mock/benefits.json")
            .then(response => response.json())
            .then(data => {
                fetch("/public/html/components/benefit-card.html")
                    .then(response => response.text())
                    .then(benefitCard => {
                        var parser = new DOMParser();
                        var cardHtml = parser.parseFromString(benefitCard, 'text/html');
                        let card = cardHtml.querySelector(".benefit-card");
                        let slide = parser.parseFromString('<div class="mySlides fade"></div>', 'text/html').querySelector(".mySlides");                        
                        slide.appendChild(card);
                        let slides = [];
                        let dots = [];
                        let j = 1;
                        for (const element of data) {
                            let slideTmp = slide?.cloneNode(true);

                            slideTmp.querySelector(".benefit-desc").innerText = element.desc;
                            slideTmp.querySelector("h3").innerText = element.header;
                            slides.push(slideTmp);
                            dots.push(
                                parser.parseFromString(`<span class="dot" onclick="currentSlide(${j})"></span>`, 'text/html').querySelector(".dot")
                            );
                            j += 1; 
                        }
                        slides.forEach(elem => slideshowContainer.appendChild(elem));

                        document.querySelector(".carousel_custom")?.appendChild(slideshowContainer);
                        document.querySelector(".carousel_custom")?.appendChild(dotsContainer);
                        dots.forEach(elem => {
                            document.querySelector(".carousel_custom .dots")?.appendChild(elem);
                        });
                        showSlides(slideIndex);
                    });

            });
    });

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".carousel_custom .mySlides");
    let dots = document.querySelectorAll(".carousel_custom .dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" show", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].className += " show";
    dots[slideIndex - 1].className += " active";
}