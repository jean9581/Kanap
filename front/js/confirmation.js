const orderId = getOrderId()
displayOrderId(orderId)

//récupéré le numéro de commande dans l'URL
function getOrderId(){
    const str = window.location.href;
const url = new URL(str);
return url.searchParams.get("orderId");
//const orderId = url.get("orderId");
}

//afficher le numéro de commande
function displayOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}