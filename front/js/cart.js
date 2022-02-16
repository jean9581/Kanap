let cart = []

getDataFromCache()

chargePage()

function chargePage() {
    cart.forEach((item) => displayItem(item))
}


function getDataFromCache(){
    //nombre d'ojet ajoutés
    const numberItems = localStorage.length
    for (let i = 0; i < numberItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    } 
        
}
function displayArticle(item){
    
    const article = document.createElement("article");
    article.classList.add("card__item")
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

function displayContent(){
    const content = document.createElement("div")
    content.classList.add("cart__item__content")
    return content
}

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
function displayInput(item){ 
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
        console.log("sup",cart)
        console.log("sup",item)
        item.quantity = 0
        console.log("sup",item)
        displayTotalPrice(item) 
        displayTotalQuantity(item)
    });
    return supprimer
}
function diplayDelete(item){ 
    //deleteItem(item))
    const deleteItem = document.createElement("p")
    deleteItem.classList.add("deleteItem")
    deleteItem.textContent = "Supprimer"
    return deleteItem
}

function displayItem(item) {
    console.log("affich",cart)
    console.log("affich",item)
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
        const input = displayInput(item)
        quantité.appendChild(input)

        //div delete
        const supprimer = diplayDivDelete(item)
        const deleteItem = diplayDelete(item)
        //insersion div delete
        setting.appendChild(supprimer)
        supprimer.appendChild(deleteItem)

        //total quantity
        displayTotalPrice(item) 
        displayTotalQuantity(item)
    } 
}

// Suppression d'un produit
function deleteProduct(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}  

function updateQuantity(id, newValue, item, color) {
    const itemToUpdate = cart.find((item) => item.id === id) 
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    //mettre nouvelle valeur dans le localstorage
    const dataSave = JSON.stringify(item)
    const key = `${id}-${color}`
    localStorage.setItem(key, dataSave)
}

function displayTotalQuantity(item) {
    if (item != null){
        console.log("qui est 0", item )
        const totalQuantity = document.querySelector("#totalQuantity")
        let total = cart.reduce((total, item) => total + item.quantity, 0)
        totalQuantity.textContent = total
    }else toltal = 0
    
}

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
    article.classList.add("card__items")
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
    article.classList.add("card__item")
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


