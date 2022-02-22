
let localCart = []
let cart = []

getDataFromCache()

//validation du formulaire 
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => {
    submitForm(e)
})

//validation du formulaire 
function submitForm(e){
    //empéche la page de se recharger
    e.preventDefault()

    // si panier vide
    if (localStorage.length === 0){
        alert("please select item to buy")
        return
    }
    //verification du prénom 
    if (firstNameValid())return
    //verification du nom 
    if (lastNameValid())return
    //verification du adresse 
    if (adressValid())return
    //verification du ville 
    if (cityValid())return
    //verification format email
    if (emailValid())return

    //prise des donner de l'utilisateur
    const body = contactRequest()


    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json" 
        }
    }
    //envoie des donner dans l'api
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        //récupérer l'orderId dans l'api
        const orderId = data.orderId
        localStorage.clear();
        
        document.location.href = "confirmation.html"+"?orderId="+orderId;
    })
    .catch((err) => {
        alert ("Problème avec fetch : " + err.message);
    });
}

//verification du contenu du prénom
function firstNameValid (){
    const firstName = document.querySelector("#firstName").value
    //Création d'une expression régulière
    const nameAndCityRegExp = /^[a-zA-Z ,.'-]+$/
    if (nameAndCityRegExp.test(firstName) === false){
        alert("Entrée un prénom valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        return true
    }
    return false
}
//verification du contenu du nom
function lastNameValid (){
    const lastName = document.querySelector("#lastName").value
    //Création d'une expression régulière
    const nameAndCityRegExp = /^[a-zA-Z ,.'-]+$/
    if (nameAndCityRegExp.test(lastName) === false){
        alert("Entrée un nom valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        return true
    }
    return false
}
//verification du contenu du nom
function adressValid (){
    const adress = document.querySelector("#address").value
    //Création d'une expression régulière
    const adressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
    if (adressRegExp.test(adress) === false){
        alert("Entrée une adresse valide.")
        return true
    }
    return false
}
//verification du contenu du nom
function cityValid (){
    const cityName = document.querySelector("#city").value
    //Création d'une expression régulière
    const nameAndCityRegExp = /^[a-zA-Z ,.'-]+$/
    if (nameAndCityRegExp.test(cityName) === false){
        alert("Entrée une ville valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        return true
    }
    return false
}
//vérifier la forme de l'email avec regex
function emailValid(){
    const email = document.querySelector("#email").value
    //Création d'une expression régulière
    const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
    if (emailRegex.test(email) === false){
        alert("Entrée une email valid")
        return true
    }
    return false
}
/*
//verification du contenu du formulaire
function formValid (){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value ===""){
            alert ("please fill all the fields")
            return true
        }
        return false
    })
}*/



//donner de l'utilisateur
function contactRequest(){
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    let idProducts = []
        for (let i = 0; i<localStorage.length;i++) {
            const key = localStorage.key(i)
            //séparer l'id et la couleur
            const id = key.split("-")[0]
            idProducts.push(id);
        }
    const body = {
        contact:{
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: idProducts,
    }
    return body
}

//récupérer les donner du localestorage
function getDataFromCache(){
    //nombre d'ojet ajoutés
    const numberItems = localStorage.length
    for (let i = 0; i < numberItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        localCart.push(itemObject)

        fetch("http://localhost:3000/api/products/" + itemObject.id)
        .then(res => res.json())
        .then(data => {
            let newData = {
                id : itemObject.id,
                color : itemObject.color,
                quantity :itemObject.quantity,
                name : itemObject.name,
                imageUrl : data.imageUrl,
                price : data.price
            }
            cart.push(newData)
            displayItem(newData, itemObject)
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
    } 
          
}

function displayItem(item, itemObject) {
    
    if (item != null){
       //crée élément article
        const article = displayArticle(item)
        const divImage = displayDivImage()
        const image = displayImage(item)
        
        //insérer image
        //insérer div image
        article.appendChild(divImage)
        divImage.appendChild(image)

        //crée div content
        const content = displayContent()
        //insérer div content
        article.appendChild(content)

        //div description
        const description = document.createElement("div")
        description.classList.add("cart__item__content__description")
        content.appendChild(description)
        //élement dans la div description 
        displayDescription(item, description)

        //div settings
        const setting = document.createElement("div")
        setting.classList.add("cart__item__content__settings")
        //insérsion 
        article.appendChild(setting)

        //div quantity
        const quantité = document.createElement("div")
        quantité.classList.add("cart__item__content__settings__quantity")
        setting.appendChild(quantité)
        const Qté = document.createElement("p")
        Qté.textContent = "Qté : "
        quantité.appendChild(Qté)
        const input = displayInput(item, itemObject)
        quantité.appendChild(input)

        //div delete
        const supprimer = diplayDivDelete(item)
        const deleteItem = displayDelete(item)
        //insersion div delete
        setting.appendChild(supprimer)
        supprimer.appendChild(deleteItem)

        //total quantity
        displayTotalPrice(item) 
        displayTotalQuantity(item)
    } 
}



function displayArticle(item){
    //création article
    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    //insérer article
    document.querySelector("#cart__items").appendChild(article)
    return article
}

function displayDivImage(){
    //crée div image
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    return divImage
}

function displayImage(item){
    //crée image
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    return image 
}

//affiche content
function displayContent(){
    const content = document.createElement("div")
    content.classList.add("cart__item__content")
    return content
}

//affichage description
function displayDescription(item, description){ 
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
}

function displayInput(item, itemObject){ 
    //création input
    const input = document.createElement("input")
    input.value = item.quantity
    input.type = "number"
    input.name = "itemQuantity"
    input.classList.add("itemQuantity")
    input.min = "1"
    input.max = "100"
    
    input.addEventListener ("input", () => {
        const newValue = input.value
        
        updateQuantity(itemObject.id, itemObject, itemObject.color,newValue)
        displayTotalPriceAndQuantity(itemObject)
        
    })
    return input
}

function diplayDivDelete(item){ 
    //div delete
    const supprimer = document.createElement("div")
    supprimer.classList.add("cart__item__content__settings__delete")
    supprimer.addEventListener("click", () => {
        const qté = item.quantity
        const itemDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
        itemDelete.remove()
        deleteProduct(item) 
        //getDataFromCache()
        item.quantity = 0
        
        displayTotalPrice(item) 
        displayTotalQuantity(item)
    });
    return supprimer
}
function displayDelete(){ 
    //deleteItem(item))
    const deleteItem = document.createElement("p")
    deleteItem.classList.add("deleteItem")
    deleteItem.textContent = "Supprimer"
    return deleteItem
}


// Suppression d'un produit
function deleteProduct(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}  

//mise a jour de la quantité d'éléments 
function updateQuantity(id, itemObject, color,newValue) {
    const itemToUpdate = localCart.find((itemObject) => itemObject.id === id) 
    itemToUpdate.quantity = Number(newValue)
    itemObject.quantity = itemToUpdate.quantity
    //mettre nouvelle valeur dans le localstorage
    const dataSave = JSON.stringify(itemObject)
    const key = `${id}-${color}`
    localStorage.setItem(key, dataSave)
}

//recalcul du prix et quantité total si modification
function displayTotalPriceAndQuantity(itemObject){
    if (itemObject != null){
        const totalQuantity = document.querySelector("#totalQuantity")
        const totalPrice = document.querySelector("#totalPrice")
        let TotalQté = 0
        let TotalPrix = 0
        const numberItems = localStorage.length
        for (let i = 0; i < numberItems; i++) {
            const data = localStorage.getItem(localStorage.key(i))
            const itemQuantity = JSON.parse(data)
            TotalQté = TotalQté + itemQuantity.quantity
            TotalPrix = TotalPrix + (itemQuantity.quantity * cart[i].price)
        } 
        totalQuantity.textContent = TotalQté
        totalPrice.textContent = TotalPrix

    }else TotalQté = 0  
}


//calcul et affichage de la quantité total 
function displayTotalQuantity(item) {
    if (item != null){
        const totalQuantity = document.querySelector("#totalQuantity")
        let total = cart.reduce((total, item) => total + item.quantity, 0)
        totalQuantity.textContent = total
    }else total = 0  
}

//calcul et affichage du prix total
function displayTotalPrice(item) {
    if (item != null){
        const totalPrice = document.querySelector("#totalPrice")
        let total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        totalPrice.textContent = total
    }else total = 0
    
}


/*
function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    //const divImage = makeImage(item)

    //const itemContent = makeContent(item)
    //article.appendChild(itemContent)

    //displayTotalPrice() 
    //displayTotalQuantity()
}

function displayArticle(article){
    //insérer article
    document.querySelector("#cart__items").appendChild(article)
}
function makeArticle(item){
    //crée élément article
    const article = document.createElement("article");
    article.classList.add("cart__items")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}   
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    let total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

function makeContent(item){
    //crée div content
    const content = document.createElement("div")
    content.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    content.appendChild(description)
    content.appendChild(settings)
    return content
}

function makeSettings(item){
    //div settings
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    addQuantitySettings (settings, item)
    deleteToSettings (settings)
    return settings
}

function deleteToSettings (settings){
    const supprimer = document.createElement("div")
    supprimer.classList.add("cart__item__content__settings__delete")

    supprimer.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"

    supprimer.appendChild(p)
    settings.appendChild(supprimer)

}

function deleteItem(item){

}
function addQuantitySettings (settings, item){
    //div quantity
    const quantité = document.createElement("div")
    quantité.classList.add("cart__item__content__settings__quantity")
    const Qté = document.createElement("p")
    Qté.textContent = "Qté : "
    quantité.appendChild(Qté)
    //création input
    const input = document.createElement("input")
    input.value = item.quantity
    input.type = "number"
    input.name = "itemQuantity"
    input.classList.add("itemQuantity")
    input.min = "1"
    input.max = "100"
    //evenement sur input
    input.addEventListener ("input", () => updateQuantity(item.id, input.value, item, item.color))

    //insérsion 
    settings.appendChild(quantité)
    quantité.appendChild(input)

}

function updateQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id) 
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalPrice() 
    displayTotalQuantity()
    saveToCache(item) 
}

function deleteToCache(item){

}

function saveToCache(item){
    //mettre nouvelle valeur dans le localstorage
    const dataSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataSave)
}

function makeDescription(item){
    //div description
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    //insérer div description
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
}


      
function makeImage(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
}



/*
cart.forEach(item => {
    //crée élément article
    const template =
    `<article class="cart__item" data-id="${product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
    </article>`
    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    //insérer article
    document.querySelector("#cart__items").appendChild(article)

    //crée div image
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    //insérer div image
    article.appendChild(div)
    //crée image
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    //insérer image
    div.appendChild(image)

    //crée div content
    const content = document.createElement("div")
    content.classList.add("cart__item__content")
    //insérer div content
    article.appendChild(content)

    //div description
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    //insérer div description
    content.appendChild(description)
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    
    //div settings
    const setting = document.createElement("div")
    setting.classList.add("cart__item__content__settings")

    //div quantity
    const quantité = document.createElement("div")
    quantité.classList.add("cart__item__content__settings__quantity")
    
    const Qté = document.createElement("p")
    Qté.textContent = "Qté : "
    //création input
    const input = document.createElement("input")
    input.value = item.quantity
    input.type = "number"
    input.name = "itemQuantity"
    input.classList.add("itemQuantity")
    input.min = "1"
    input.max = "100"
    input.addEventListener ("input", () => {
        updateQuantity(item.id, input.value, item, item.color),
        displayTotalPrice(),
        displayTotalQuantity()
    })
          


    //insérsion 
    article.appendChild(setting)
    setting.appendChild(quantité)
    quantité.appendChild(Qté)
    quantité.appendChild(input)

    //div delete
    const supprimer = document.createElement("div")
    supprimer.classList.add("cart__item__content__settings__delete")
    supprimer.addEventListener("click", () => {
        const itemDelete = cart.find(
            (kanap) => kanap.id === item.id && kanap.color === item.color
        )
        cart.splice(itemDelete, 1)
        chargerProduit()
        console.log(itemDelete)
    })

    const deleteItem = document.createElement("p")
    deleteItem.classList.add("deleteItem")
    deleteItem.textContent = "Supprimer"

    //insersion div delete
    setting.appendChild(supprimer)
    supprimer.appendChild(deleteItem)

    //total quantity
    displayTotalPrice() 
    displayTotalQuantity()
});



function updateQuantity(id, newValue, item, color) {
    const itemToUpdate = cart.find((item) => item.id === id) 
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    //mettre nouvelle valeur dans le localstorage
    const dataSave = JSON.stringify(item)
    const key = `${id}-${color}`
    localStorage.setItem(key, dataSave)
}

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    let total = cart.reduce((total, item) => total + item.quantity, 0)
    if (totalQuantity != null) totalQuantity.textContent = total
}

function displayTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    if (totalPrice != null) totalPrice.textContent = total
    //let total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
}*/


