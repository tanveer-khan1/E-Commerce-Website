let username=document.querySelectorAll("input")[0]
let password=document.querySelectorAll("input")[1]
let form=document.querySelector("form")
let euser=document.querySelectorAll("span")[0]
let epass=document.querySelectorAll("span")[1]
let eform=document.querySelectorAll("span")[2]


// console.log(username,password,form,eform,epass,euser)
let lstorage=JSON.parse(localStorage.getItem("lstorage"))
console.log(lstorage)


// form.addEventListener("submit",()=>{
//     if(username.value==="" && password.value==""){
//         alert("username is required")
//         alert("password is required")
//     }
//     else if(username.value==""){
//     alert("username is required")
//     }
//     else if(password.value==""){
//         alert("password is required")
//     }
//     else if(username.value==="tanveer" && password.value=="1234"){
//         alert("access granted")

//     }
//     else{
//         alert("access denied")
//     }

// })

form.addEventListener("submit",(e)=>{

    euser.innerHTML=""
    epass.innerHTML=""
    eform.innerHTML=""

    let matching=lstorage.find((e)=>{
        if((e.userEmail==username.value && userPassword==password.value) || (e.userMobile==username.value && e.userPassword==password.value))
        return e
    })

    console.log(matching)


    if(username.value=="" && password.value==""){
        euser.innerHTML="type username"
        epass.innerHTML="type password"
        e.preventDefault()
    }
   else if(username.value==""){
        euser.innerHTML="type username"
        e.preventDefault()     
    }
    else if(password.value==""){
        euser.innerHTML="type password"
        e.preventDefault()  
    }
    else if(matching){
        alert("access granted")
        localStorage.setItem("user",JSON.stringify(matching))
    }
    else{
        eform.innerHTML="go away"
        e.preventDefault()
    }

})