const orderId = getOrderId()
displayOrderId(orderId)

function getOrderId(){
    const str = window.location.href;
const url = new URL(str);
return url.searchParams.get("orderId");
//const orderId = url.get("orderId");
}

function displayOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}