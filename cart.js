//The async script ensurings that the page is downloading at same time as the body in the our index.html
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)//this event will fire as soon as the page is downloading
} else {
    ready()
}
// The below ready function allows setting of all event listerners when the document loads
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)//whenever this button is clicked, items will be removed from the cart
    }
    // below: when the quantity changes, the total gets updated
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)//this allows for the purchase button to be functional
}
//below function notifies the user that the item has been purchased
function purchaseClicked() {
    let timestamp = new Date().getUTCMilliseconds();
    alert('Thank you for your purchase. ' + 'Your order number is ' + timestamp)
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//the below function checks if the input is a number/is not a negative number
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1//ensures that atleast we want 1 item to be purchased
    }
    updateCartTotal()
}

//the below function ensures that the buttons are functional
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('img-thumbnail img-fluid')[0].src
    addItemToCart(title, price, imageSrc)//allows for the user to view the item image and price
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" "img-thumbnail img-fluid">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn-sm btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)//this allows for the remove button to be functional
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)//this allows for the quantity box to be functional
}
//below we create a function to update the total our cart when ever the user removes an item from the cart with the aid of an alert
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('R', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    let vat = total * 0.15
    vat = Math.round(vat * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + (total + vat);
    document.getElementsByClassName('cart-total-vat')[0].innerText = "VAT : " + 'R' + vat;
    alert("Your new total is " + "R" + (total + vat));
  let totalWithPromo = ((total + vat)*0.55)
  document.getElementsByClassName('cart-total-promo')[0].innerText = "Total with promo: " + 'R' + totalWithPromo.toFixed(2);
}

//function to display the delivery textarea once the button has been clicked

$(document).ready(function(){
$('#addressInput').hide();
$(".shippingOptions").hide();
$(".delivery").on("click",function(){
$('#addressInput').slideToggle(1000);
$(".shippingOptions").slideToggle(1000);
});
});

//function to display the collection address once the collection button has been clicked
$(document).ready(function(){
  $("#collectInfo").hide()
  $(".collection").on("click",function(){
  $("#collectInfo").show();
  });
});

// Function to claim the promo code
function applyPromo(){
  let applied  = document.getElementsByClassName('cart-total-price')[0].innerText;
   let totalWithPromo = parseFloat(applied.replace('R', ''));
  let finalPrice = (totalWithPromo * 0.55)
  if (document.getElementById("coupons").value === "EVERGREEN"){
    alert("Promo applied! \n You new total is " + finalPrice.toFixed(2))
  }
  else{
    alert("Invalid claim code")
  }
}
//function to reveal the price with promo on claim code click and entry
$(document).ready(function(){
  $(".cart-total-promo").hide();
  $(".claimcode").on("click", function(){
  $(".cart-total-promo").show();
  });
});
//function to add shipping amounts to the total
function applyStandardShipping(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let standardShipping = (shipping + 50);
  document.getElementsByClassName('cart-total-price')[0].innerText = standardShipping;
  alert("Standard shipping applied." + "\n Your new total is " + "R" + standardShipping)
}
  
//function to apply domestic Priority Shipping 

 function applyPriorityShipping(){
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
   let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let priorityShipping = (shipping + 100);
  document.getElementsByClassName('cart-total-price')[0].innerText =   priorityShipping;
    alert("Priority shipping applied." + "\n Your new total is " + "R" + priorityShipping)
 }

//function for international Standard shipping to be added on buttn click

function applyIntStandardShipping(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let internationalStandard = (shipping + 100);
  document.getElementsByClassName('cart-total-price')[0].innerText = internationalStandard;
  alert("Standard International shipping applied." + "\n Your new total is " + "R" + internationalStandard)
}

//function for international Priority shipping to be added on buttn click

function applyInternationalPriority(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let internationalPriority = (shipping + 200);
  document.getElementsByClassName('cart-total-price')[0].innerText = internationalPriority;
  alert("International Priority shipping applied." + "\n Your new total is " + "R" + internationalPriority)
}

//Function for collection from store

function applyCollection(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let Collection = (shipping + 0);
  document.getElementsByClassName('cart-total-price')[0].innerText = Collection;
  alert("Collection option applied." + "\n Your new total is " + "R" + Collection)
}

//function for Free Shipping to be added on buttn click  
function applyFreeShipping(){
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
   let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let freeShipping = (shipping + 2000);
  document.getElementsByClassName('cart-total-price')[0].innerText = freeShipping;
    alert("Free shipping applied to order." + "\n Your new total is " + "R" + freeShipping)
}

function applyUnderAmount(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let underAmountR2000 = (shipping + 150);
  document.getElementsByClassName('cart-total-price')[0].innerText = underAmountR2000;
  alert("R150 shipping fee applied." + "\n Your new total is " + "R" + underAmountR2000)
}


function applyOverNight(){
  let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  let overNightshipping = (shipping + 250);
  document.getElementsByClassName('cart-total-price')[0].innerText = overNightshipping;
  alert("Overnight shipping applied." + "\n Your new total is " + "R" + overNightshipping)
}