
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
let Urlimage= "";

fetch("http://localhost:3000/api/products/" + id)
    .then(res => res.json())
    .then(data => LoadPage(data))
        

function LoadPage(kanap){
    const { altTxt, colors, description, imageUrl, name, price, _id } = kanap
    
    //création élément //image
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    //place de l'élément //image
    const parent = document.querySelector(".item__img")
    //affichage de l'élément //image
    if (parent != null) parent.appendChild(image)

    //place de l'élément (id=>"#...") //name
    const h1 = document.querySelector("#title")
    //affichage de l'élément //name
    if (h1 != null) h1.textContent = name

    //place de l'élément (id=>"#...") //name
    const span = document.querySelector("#price")
    //affichage de l'élément //name
    if (span != null) span.textContent = price

    //place de l'élément (id=>"#...") //name
    const p = document.querySelector("#description")
    //affichage de l'élément //name
    if (p != null) p.textContent = description

    //place de l'élément (id=>"#...") //name
    const select = document.querySelector("#colors")
    //affichage de l'élément //name
    if (select != null) {
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        });
    }
    Urlimage = imageUrl
    return Urlimage 
}


const button = document.querySelector("#addToCart")
if (button != null){
    button.addEventListener("click", (e) =>{
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        const name = document.querySelector("#title").textContent
        const price = document.querySelector("#price").textContent
        console.log(price)
        if (color == null || color ==="" || quantity == null || quantity == 0 || quantity > 100){
            alert("selectionnez une couleur ainsi qu'une quantiter comprise entre 1 et 100 merci !")
        }else{
            const key = `${id}-${color}`
            let data = {
            id : id,
            color : color,
            quantity : Number(quantity),
            name : name,
            imageUrl : Urlimage,
            price : Number(price)
            }
            //mettre dans le
            localStorage.setItem(key, JSON.stringify(data))
            //fenêtre pop-up
            if (confirm(data.quantity +","+ data.name + 'de couleur '+ data.color + ', a été ajoutée au panier Pour consulter votre panier, cliquez sur OK')) {
                window.location.href = "cart.html";
            }  
        }
        
    })
}