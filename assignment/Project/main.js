document.addEventListener('DOMContentLoaded',()=>{
updateCartBadge();
let currentSlide=0;
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.dot');
let slideInterval;
if(slides.length>0){
const showSlide=(index)=>{
slides.forEach(s=>s.classList.remove('active'));
dots.forEach(d=>d.classList.remove('active'));
if(index>=slides.length)currentSlide=0;
if(index<0)currentSlide=slides.length-1;
slides[currentSlide].classList.add('active');
dots[currentSlide].classList.add('active');
};
window.nextSlide=()=>{clearInterval(slideInterval);currentSlide++;showSlide(currentSlide);startAutoSlide();};
window.prevSlide=()=>{clearInterval(slideInterval);currentSlide--;showSlide(currentSlide);startAutoSlide();};
window.goToSlide=(index)=>{clearInterval(slideInterval);currentSlide=index;showSlide(currentSlide);startAutoSlide();};
const startAutoSlide=()=>{slideInterval=setInterval(()=>{currentSlide++;showSlide(currentSlide);},4000);};
startAutoSlide();
}
const featured=document.getElementById('featuredProducts');
if(featured){featured.innerHTML=PRODUCTS.slice(0,4).map(productCard).join('');}
const shopGrid=document.getElementById('shopGrid');
if(shopGrid){
const renderShop=(category='All')=>{
const list=category==='All'?PRODUCTS:PRODUCTS.filter(p=>p.category===category);
shopGrid.innerHTML=list.map(productCard).join('');
};
renderShop('All');
document.querySelectorAll('.filter-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
renderShop(btn.dataset.cat);
});
});
}
const detail=document.getElementById('productDetail');
if(detail)renderProductDetail(detail);
const cartRoot=document.getElementById('cartRoot');
if(cartRoot)renderCartPage(cartRoot);
const form=document.getElementById('contactForm');
if(form){form.addEventListener('submit',(e)=>{e.preventDefault();showToast('Message sent successfully!');form.reset();});}
});
function productCard(p){
return `
<div class="product-card">
<a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='https://placehold.co/600x600?text=Product'"></a>
<div class="card-body">
<p class="card-cat">${p.category}</p>
<h3 class="card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
<p class="card-price">RM ${p.price.toFixed(2)}</p>
<button class="add-btn" onclick="addToCart(${p.id},1)">Add to Cart</button>
</div>
</div>`;
}
function renderProductDetail(container){
const params=new URLSearchParams(window.location.search);
const id=params.get('id');
const p=getProductById(id);
if(!p){
container.innerHTML=`<div style="text-align:center;"><p>Product not found.</p><a href="shop.html" class="add-btn" style="display:inline-block;margin-top:20px;width:auto;">Back to Shop</a></div>`;
return;
}
container.innerHTML=`
<div class="product-detail">
<img src="${p.image}" alt="${p.name}" class="detail-img" onerror="this.src='https://placehold.co/600x600?text=Product'">
<div class="detail-info">
<p class="card-cat">${p.category}</p>
<h1>${p.name}</h1>
<p class="detail-price">RM ${p.price.toFixed(2)}</p>
<p class="detail-desc">${p.description}</p>
<div class="detail-actions">
<input type="number" id="qtyInput" value="1" min="1" style="width:70px;padding:12px;border:1px solid #ddd;border-radius:8px;text-align:center;">
<button class="add-btn" id="addToCartBtn" style="width:auto;padding:12px 40px;">Add to Cart</button>
</div>
</div>
</div>`;
const qtyInput=document.getElementById('qtyInput');
document.getElementById('addToCartBtn').onclick=()=>{addToCart(p.id,parseInt(qtyInput.value,10));};
}