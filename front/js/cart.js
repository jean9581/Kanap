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
        alert("votre panier est vide")
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

    let responce = false
    if (nameAndCityRegExp.test(firstName) === false){
        alert("Entrée un prénom valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        responce = true
    }
    return responce
}
//verification du contenu du nom
function lastNameValid (){
    const lastName = document.querySelector("#lastName").value
    let responce = false
    //Création d'une expression régulière
    const nameAndCityRegExp = /^[a-zA-Z ,.'-]+$/
    if (nameAndCityRegExp.test(lastName) === false){
        alert("Entrée un nom valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        responce = true
    }
    return responce
}
//verification du contenu de l'adresse
function adressValid (){
    const adress = document.querySelector("#address").value
    let responce = false
    //Création d'une expression régulière
    const adressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
    if (adressRegExp.test(adress) === false){
        alert("Entrée une adresse valide.")
        responce = true
    }
    return responce
}
//verification du contenu de la ville
function cityValid (){
    const cityName = document.querySelector("#city").value
    let responce = false
    //Création d'une expression régulière
    const nameAndCityRegExp = /^[a-zA-Z ,.'-]+$/
    if (nameAndCityRegExp.test(cityName) === false){
        alert("Entrée une ville valide. Les chiffres ne sont pas autorisé et seulement les caratéres ' . ' et ' - ' sont autorisé")
        responce = true
    }
    return responce
}
//vérifier la forme de l'email avec regex
function emailValid(){
    const email = document.querySelector("#email").value
    let responce = false
    //Création d'une expression régulière
    const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
    if (emailRegex.test(email) === false){
        alert("Entrée une email valid")
        responce = true
    }
    return responce
}

//donner de l'utilisateur
function contactRequest(){
    const form = document.querySelector(".cart__order__form"),
    firstName = form.elements.firstName.value,
    lastName = form.elements.lastName.value,
    address = form.elements.address.value,
    city = form.elements.city.value,
    email = form.elements.email.value
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
        const Qte = document.createElement("p")
        Qte.textContent = "Qté : "
        quantité.appendChild(Qte)
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

function diplayDivDelete(itemObject){ 
    //div delete
    const supprimer = document.createElement("div")
    supprimer.classList.add("cart__item__content__settings__delete")
    supprimer.addEventListener("click", () => {
        let {id,color,quantity} = itemObject
        const itemDelete = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`)
        itemDelete.remove()
        deleteProduct(itemObject) 
        //getDataFromCache()
        quantity = 0
        
        displayTotalPriceAndQuantity(itemObject)
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
function deleteProduct(itemObject) {
    const key = `${itemObject.id}-${itemObject.color}`
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
    let TotalQte = 0
    let TotalPrix = 0
    if (itemObject != null || item != null){
        const totalQuantity = document.querySelector("#totalQuantity")
        const totalPrice = document.querySelector("#totalPrice")
        
        const numberItems = localStorage.length
        for (let i = 0; i < numberItems; i++) {
            const data = localStorage.getItem(localStorage.key(i))
            const itemQuantity = JSON.parse(data)
            TotalQte = TotalQte + itemQuantity.quantity
            TotalPrix = TotalPrix + (itemQuantity.quantity * cart[i].price)
        } 
        totalQuantity.textContent = TotalQte
        totalPrice.textContent = TotalPrix

    }else TotalQte = 0  
}


//calcul et affichage de la quantité total 
function displayTotalQuantity(item) {
    
    if (item != null){
        const totalQuantity = document.querySelector("#totalQuantity")
        let total = cart.reduce((intTot, element) => intTot + element.quantity, 0)
        totalQuantity.textContent = total
    }else total = 0  
}

//calcul et affichage du prix total
function displayTotalPrice(item) {
    if (item != null){
        const totalPrice = document.querySelector("#totalPrice")
        let total = cart.reduce((intTot, element) => intTot + element.price * element.quantity, 0)
        totalPrice.textContent = total
    }else total = 0
    
}
