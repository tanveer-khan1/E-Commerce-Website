let user=JSON.parse(localStorage.getItem("user"))
let login=document.querySelector("#login")
let right=document.querySelector(".right")
console.log(user , login, right);

let menSection=document.querySelector("#menSection")
let womenSection=document.querySelector("#WomenSection")
let electronicsSection=document.querySelector("#electronicsSection")
let kidsSection=document.querySelector("#kidsSection")

let designSection=document.querySelector(".design")
console.log(designSection);
let cartSection=document.querySelector("#cart")
console.log(cartSection);
let close=document.querySelector("#close")
console.log(close);

let cartCont=document.querySelector("#cart-cont")
console.log(cartCont);

let cartStorage=[]
let total=document.querySelector("#total")

close.addEventListener("click",()=>{
    cartSection.style.right="-100%"
})

if(user){
    login.remove()
    right.innerHTML=`<a href="./ECOMMERCE.html" id="logout"><button>Logout</button></a>
    <span style="color:white;">${user.userName}</span>
    <a href="#"><button><i class="fa-solid fa-cart-shopping"></i></button></a>`

    let logout=document.querySelector("#logout")
    logout.addEventListener("click",()=>{
        localStorage.removeItem("user")
    })
    
    
}

async function products(){
    let data=await fetch("https://www.shoppersstack.com/shopping/products/alpha")
    let alldata=await data.json()
    console.log(data,alldata)
    let mendata=alldata.data.filter((e)=>{
        if(e.category=="men"){
            return e
        }
    })
    console.log(mendata)

    let womendata=alldata.data.filter((e)=>{
        if(e.category=="women"){
            return e
        }
    })
    console.log(womendata)

    let kidsdata=alldata.data.filter((e)=>{
        if(e.category=="kids"){
            return e
        }
    })
    console.log(kidsdata)

    let electronicsdata=alldata.data.filter((e)=>{
        if(e.category=="electronics"){
            return e
        }
    })
    console.log(electronicsdata)

    mendata.map((e)=>{
        menSection.innerHTML+=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>

     </div>`

    })
   womendata.map((e)=>{
        menSection.innerHTML+=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>

     </div>`

    })
    electronicsdata.map((e)=>{
        menSection.innerHTML+=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>

     </div>`

    })

  
     kidsdata.map((e)=>{
        menSection.innerHTML+=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>

     </div>`

    })

    let designBtn=designSection.querySelectorAll("button")
    //console.log(designBtn);

    designBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            // console.log(btn);

            cartSection.style.right="0"
            let parentElement=btn.parentElement.id
            console.log(parentElement);

            let product=alldata.data.find((e)=>{
                if(parentElement==e.productId){
                    return e;
                }
            })

            cartStorage=cartStorage.filter((e)=>{
                if(e.productId !=product.productId){
                    return e
                }
            })

            cartStorage.push(product)
            // console.log(product,cartStorage);

            function cartproduct(){
                cartCont.innerHTML =""
                cartStorage.map((e)=>{
                    cartCont.innerHTML +=`<div class="cart-itm" id="${e.productId}">
                    <div><img src="${e.productImageURLs[0]}" alt=""></div>
                    <div><h3>${e.name}</h3>
                    <input type="number">
                    <h5>${e.price}</h5>
                    </div>
                    <div><h4 class="sub">${e.price}</h4></div>
                    <div><i class="fa-solid fa-trash"></i></div>
                    </div>`
                })
                removeproduct();
                subtotal()
                grandTotal()


            }

            cartproduct();

            function removeproduct(){
                let  del=document.querySelectorAll(".fa-trash")
                del.forEach((btn)=>{
                    btn.addEventListener("click",()=>{
                        //console.log(btn);

                        let parentId=btn.parentElement.parentElement.id
                        console.log(parentId)

                        cartStorage=cartStorage.filter((e)=>{
                            if(e.productId !=parentId){
                                return e
                            }
                        })
                        console.log(cartStorage)
                        cartproduct()

                    })
                })
            }

            

            
           
        })
    })

}




products()

function subtotal(){
    let input=document.querySelectorAll("input")

    input.forEach((quantity)=>{
        quantity.addEventListener("input",()=>{
            if(quantity.value<1){
                quantity.value=1
            }

            let parent=quantity.parentElement.parentElement
            let price=parent.querySelector("h5")
            let sub=parent.querySelector("h4")
            sub.innerHTML=quantity.value*price.innerHTML
           // console.log(parent,price,sub)
            grandTotal()
        })
    })
    
}

function grandTotal(){
let sub=document.querySelectorAll(".sub")
let temp=0
sub.forEach((e)=>{
   let subNumber=parseInt(e.innerHTML)
    temp +=subNumber
})
total.innerHTML=`Total : ${temp}`
}
