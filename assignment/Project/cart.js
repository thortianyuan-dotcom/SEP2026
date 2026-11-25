const CART_KEY='beanbliss_cart';
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return[];}}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartBadge();refreshCartPage();}
function getCartCount(){return getCart().reduce((sum,item)=>sum+item.qty,0);}
function updateCartBadge(){document.querySelectorAll('.cart-badge').forEach(el=>{el.textContent=getCartCount();});}
function getProductById(id){return PRODUCTS.find(p=>p.id===Number(id));}
function addToCart(id,qty=1){
const product=getProductById(id);
if(!product)return;
const cart=getCart();
const existing=cart.find(i=>i.id===id);
if(existing)existing.qty+=qty;
else cart.push({id:id,qty:qty});
saveCart(cart);
showToast(`${product.name} added to cart`);
}
function updateQty(id,qty){
const cart=getCart();
const item=cart.find(i=>i.id===id);
if(!item)return;
item.qty=Number(qty);
if(item.qty<=0){removeFromCart(id);}else{saveCart(cart);}
}
function removeFromCart(id){const cart=getCart().filter(i=>i.id!==id);saveCart(cart);}
function checkout(){
if(getCart().length===0)return;
alert('Thank you! Your order has been placed successfully.');
saveCart([]);
}
function refreshCartPage(){const root=document.getElementById('cartRoot');if(root)renderCartPage(root);}
function renderCartPage(root){
const cart=getCart();
if(cart.length===0){
root.innerHTML=`<div style="text-align:center;padding:40px;"><p style="margin-bottom:20px;font-size:1.2rem;">Your cart is empty.</p><a href="shop.html" class="add-btn" style="display:inline-block;width:auto;padding:12px 30px;">Continue Shopping</a></div>`;
return;
}
let total=0;
const rows=cart.map(item=>{
const p=getProductById(item.id);
if(!p)return '';
const subtotal=p.price*item.qty;
total+=subtotal;
return `
<tr>
<td><div style="display:flex;align-items:center;gap:15px;"><img src="${p.image}" alt="${p.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"><span style="font-weight:600;">${p.name}</span></div></td>
<td>RM ${p.price.toFixed(2)}</td>
<td><input type="number" value="${item.qty}" min="1" onchange="updateQty(${p.id},this.value)" style="width:60px;padding:8px;border:1px solid #ddd;border-radius:4px;text-align:center;"></td>
<td>RM ${subtotal.toFixed(2)}</td>
<td><button onclick="removeFromCart(${p.id})" style="background:none;border:none;color:#ba0c2f;cursor:pointer;font-weight:600;">Remove</button></td>
</tr>`;
}).join('');
root.innerHTML=`
<table class="cart-table">
<thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr></thead>
<tbody>${rows}</tbody>
</table>
<div class="cart-summary">
<div class="summary-row"><span>Total</span><span>RM ${total.toFixed(2)}</span></div>
<button class="add-btn" onclick="checkout()">Checkout Now</button>
</div>`;
}
function showToast(message){
let toast=document.getElementById('toast');
if(!toast){toast=document.createElement('div');toast.id='toast';document.body.appendChild(toast);}
toast.textContent=message;
toast.classList.add('show');
clearTimeout(toast._timer);
toast._timer=setTimeout(()=>toast.classList.remove('show'),2200);
}