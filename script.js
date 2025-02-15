const addToCartButtons = document.querySelectorAll(".addToCartBtn");
const ulCart = document.querySelector("#ulCart");
const allQuantity = document.querySelector(".allQuantity");
const finalPrice = document.querySelector(".finalPrice");
const orderTotal = document.createElement("p");
const amount = document.createElement("h3");
const recapEmpty = document.querySelector(".recapEmpty");
const confirmOrder = document.querySelector(".confirmOrder");

let allQtt = 0;
let totalAmount = 0;

function updateTotals() {
    amount.textContent = "$" + totalAmount.toFixed(2);
    orderTotal.textContent = "Order Total"
    allQuantity.textContent = allQtt;
}

function confirmOrderContainer() {
    confirmOrder.innerHTML = `
        <button>Confirm Order</button>
    `;
    return confirmOrder;
}

function InfoDeliveryContainer() {
    const infoDelivery = document.querySelector(".infoDelivery");
    infoDelivery.innerHTML = `
        <div><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg></div>
        <p>This is <strong>carbon-neutral</strong> delivery</p>
        `;
        infoDelivery.style.padding = "5px 20px";

        return infoDelivery;
}

function createQuantityContainer() {
    const quantityContainer = document.createElement("div");
    quantityContainer.className = "quantityContainer";
    quantityContainer.innerHTML = `
        <div class="decrButton"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></div>
        <span class="quantity">1</span>
        <div class="incrButton"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></div>
    `;
    return quantityContainer;
}

function createCartItem(productName, productPrice) {
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.innerHTML = `
        <p>${productName}</p>
        <div class="liRow">
            <div class="detailRow">
                <p><span class="cartQuantity">1x</span></p>
                <p><span class="unitPrice">$${productPrice.toFixed(2)}</span></p>
                <p><span class="totalPrice">$${productPrice.toFixed(2)}</span></p>
            </div>
            <div>
                <div class="deleteButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></div>
            </div>
        </div>
    `;
    return cartItem;
}

addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const productElement = this.closest(".element");
        const productName = productElement.querySelector(".infoProduct h3").textContent.trim();
        const productPrice = parseFloat(productElement.querySelector(".price").textContent.trim());
        const productImg = productElement.querySelector(".elementImgContainer img");
        const borderImg = productElement.querySelector(".elementImgContainer");
        const productImgSrc = productImg.src;
        
        const addImgBtn = productElement.querySelector(".addImgBtn");

        const quantityContainer = createQuantityContainer();
        const infDelivery = InfoDeliveryContainer();
        const orderButton = confirmOrderContainer();
        const cartItem = createCartItem(productName, productPrice);
        cartItem.setAttribute("data-img", productImgSrc);

        const incrButton = quantityContainer.querySelector(".incrButton");
        const decrButton = quantityContainer.querySelector(".decrButton");
        const deleteButton = cartItem.querySelector(".deleteButton");
        const quantityDisplay = quantityContainer.querySelector(".quantity");
        const cartQuantityDisplay = cartItem.querySelector(".cartQuantity");
        const totalPriceDisplay = cartItem.querySelector(".totalPrice");
        borderImg.style.border = "3px solid #C73C0D";
        borderImg.style.borderRadius = "15px"
        borderImg.style.background = "#C73C0D";



        let quantity = 1;

        totalAmount += productPrice;
        allQtt += 1;
        updateTotals();

        incrButton.addEventListener("click", () => {
            quantity++;
            totalAmount += productPrice;
            allQtt++;
            quantityDisplay.textContent = quantity;
            cartQuantityDisplay.textContent = quantity + "x";
            totalPriceDisplay.textContent = "$" + (quantity * productPrice).toFixed(2);
            updateTotals();
        });

        decrButton.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                totalAmount -= productPrice;
                allQtt--;
                quantityDisplay.textContent = quantity;
                cartQuantityDisplay.textContent = quantity + "x";
                totalPriceDisplay.textContent = "$" + (quantity * productPrice).toFixed(2);
                updateTotals();
            } else {
                deleteButton.click();
            }
        });

        deleteButton.addEventListener("click", () => {
            totalAmount -= quantity * productPrice;
            allQtt -= quantity;
            cartItem.remove();
            quantityContainer.remove();
            amount.remove();
            orderTotal.remove();
            orderButton.style.display = "none";
            infDelivery.style.display = "none";
            button.style.display = "block";
            addImgBtn.style.display = "flex";
            if (allQtt < 1)
            {
                recapEmpty.style.display = "flex";
            }
            updateTotals();
        });

        orderButton.addEventListener("click", () => {
            const validatedOrder = document.querySelector(".validatedOrder")
            const cartItems = ulCart.querySelectorAll(".cartItem");
            let orderProducts = "";

            cartItems.forEach((cartItem) => {
                const productName = cartItem.querySelector("p").textContent.trim();
                const productQuantity = cartItem.querySelector(".cartQuantity").textContent.trim();
                const productUnitPrice = cartItem.querySelector(".unitPrice").textContent.trim();
                const productTotalPrice = cartItem.querySelector(".totalPrice").textContent.trim();
                const productImgSrc = cartItem.getAttribute("data-img");

                orderProducts += `<div class="orderProductContainer">
                                <div class="orderProduct">
                                <div>
                                    <img src="${productImgSrc}" alt="">
                                </div>
                                <div class="infoOrderProduct">
                                    <div>
                                        <p>${productName}</p>
                                    </div>
                                    <div class="quantityPrice">
                                        <div class="cartPrice">
                                            <p class="cartQuantity">${productQuantity}</p>
                                            <p class="unitPrice">${productUnitPrice}</p>
                                        </div>
                                        <div>
                                            <h3>${productTotalPrice}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
            })
                validatedOrder.innerHTML = `
                <div class="orderRecap">
                    <div class="orderElement">
                        <div class="enteteRecap">
                            <div>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                                <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
                                </svg>
                            </div>
                            <h2>Order Confirmed</h2>
                            <p>We hope you enjoy your food!</p>
                        </div>
                    </div>
                    ${orderProducts}
                    <div class="validatedAmount">
                    <p>Order Total</p>
                    <h2>$${totalAmount.toFixed(2)}</h2>
                    </div>
                    <button class="newOrder">Start New Order</button>
                </div>
            `;
            validatedOrder.style.display = "flex";
            validatedOrder.style.width = "100%";
            validatedOrder.style.height = "100%";
            validatedOrder.style.padding = "50px";
            validatedOrder.style.position = "fixed";
            const newOrder = document.querySelector(".newOrder");
            newOrder.addEventListener("click", () => {
                location.reload();
            });
        });
        orderButton.style.display = "block";
        addImgBtn.style.display = "none";
        infDelivery.style.display = "flex";
        if (allQtt >= 1)
        {
            recapEmpty.style.display = "none";
        }
        finalPrice.appendChild(orderTotal);
        finalPrice.appendChild(amount);
        ulCart.appendChild(cartItem);
        productElement.querySelector(".addToCart").appendChild(quantityContainer);
    });
});
