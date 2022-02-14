
getArticles()


function getArticles(){
    // Répartition des données de l'API dans le DOM
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        data.forEach(kanap => {
            //const id = data[0]._id
            const { _id, imageUrl, altTxt, name, description} = kanap
            //création élemlent a avec URL produit
            const anchor = document.createElement("a")
            anchor.href = "./product.html?id="+ _id
            //création article
            const article = document.createElement("article")
            const items = document.querySelector("#items")
            if (items != null ) {
                items.appendChild(anchor)
                anchor.appendChild(article)
            }
            //affiche image
            const image = document.createElement("img")
            image.src = imageUrl
            image.alt = altTxt
            article.appendChild(image)
            //affiche titre
            const h3 = document.createElement("h3")
            h3.textContent = name
            h3.classList.add("productName")
            article.appendChild(h3)
            //affichage description
            const p = document.createElement("p")
            p.textContent = description 
            p.classList.add("productDescription")
            article.appendChild(p)
        });  
    });
}

/*
fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => addProducts(data))

//affiche les articles
function addProducts(data){
    data.forEach(kanap => {
        const {_id, imageUrl, altTxt, name, description} = kanap
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraphe(description)
        appendElementsToAcrticle(article, [image, h3, p])
        appendArticleToAnchor(anchor, article)
    });
}
//création arcticle
function appendElementsToAcrticle(article, Array){
    Array.forEach(item => {article.appendChild(item)})
}

function makeAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id="+id
    return anchor
}

function appendArticleToAnchor(anchor, article){
    const items = document.querySelector("#items")
    if (items != null ) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

//afficher l'image
function makeImage (imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

//création de l'élément "h3"
function makeH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

//Afficher  la description
function makeParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description 
    p.classList.add("productDescription")
    return p 
}

/*

ItemSection();

// Récupération des articles de l'API
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return articlesCatch.json();
}

// Répartition des données de l'API dans le DOM
async function ItemSection() {
    var result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}
*/