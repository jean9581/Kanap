const cart = [];



getDataFromCache()
function getDataFromCache(){
    //nombre d'ojet ajoutés
    const numberItems = localStorage.length
    for (let i = 0; i < numberItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }    
}

cart.forEach(item => {
    //crée élément article
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
}


