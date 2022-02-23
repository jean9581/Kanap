
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
