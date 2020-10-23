const { clean_input,clean_select_button,Button_role,get_champ_name,get_data,get_list_champ,new_appendChild,clean_page,new_setAttributes } = require("./app/js/script.js")
const valid_button = document.querySelector("#Valider")
const select = document.querySelector("#select")
const champ_name = document.querySelector("#champ_name")
const role_Button = document.querySelectorAll(".role_Button")
const img_role = document.querySelectorAll("img.img_role")
const body = document.querySelector("body")

const div_radio = document.querySelector(".radio_box")

const main_corps = document.querySelector("main")

const header = document.createElement("header"),
footer = document.createElement("footer"),
img = document.createElement("img"),
paragraphe = document.createElement("p"),
summoner1 = document.createElement("img"),
summoner2 = document.createElement("img")

const back_button = document.createElement("button")
let textnode = document.createTextNode("Retour")
back_button.appendChild(textnode)

const button_test = new Button_role(role_Button)

let video_bliz = document.createElement("video")
let source = document.createElement("source")

let list_champ = null

valid_button.addEventListener('click',()=>{
  clean_page(main_corps)
  create_wait_page()
  get_data(champ_name.value,button_test.who_is_checked()).then((list_data)=>{
    clean_select_button(role_Button,img_role)
    clean_input(champ_name)
    clean_page(main_corps)
    create_rune_page(list_data,champ_name.value)
  }).catch((err)=>{
    console.log(err);
  })
})



role_Button.forEach((item, i) => {
  item.addEventListener('click',()=>{

    if(img_role[i].classList.contains("img_role"))
    {
      img_role[i].classList.replace("img_role","img_role_select")
    }
    else if (img_role[i].classList.contains("img_role_select"))
    {
      img_role[i].classList.replace("img_role_select","img_role")
      role_Button[i].checked = false
    }

  })

})



//Promesse qui Retourne tout les champions de lol
get_list_champ().then((data)=>{
  list_champ = data
}).catch((error)=>{
    get_champ_name((data)=>{
      list_champ = data
    })
})


//Chaque frappe vérifie si le champ existe
champ_name.addEventListener('input',()=>{
  if (list_champ.includes(champ_name.value))
  {
    valid_button.disabled = false
    try
    {
      valid_button.classList.replace("unvalid_button","valid_button")
    }catch(e){}
  }
  else if (champ_name.value.length == 1)
  {
    champ_name.value = champ_name.value.toUpperCase()
  }
  else
  {
    valid_button.disabled = true
    try
    {
      valid_button.classList.replace("valid_button","unvalid_button")
    }catch(e){}
  }
})

back_button.addEventListener('click',()=>{
  clean_page(main_corps)
  create_main_page()
})


function create_wait_page(){

  new_setAttributes(source,{"src":"app/mp4/bliz.mp4","type":"video/mp4"})

  video_bliz.appendChild(source)

  new_setAttributes(video_bliz,{"height":"240","width":"240","autoplay":"","loop":""})


  let text = document.createTextNode("Blitzcrank va chercher les données")
  let para = document.createElement("p")

  para.appendChild(text)
  new_appendChild(main_corps,[para,video_bliz])
  video_bliz.load()

}

function create_rune_page(list_data,nom_champ){

  creation_top_page(list_data.Champ,list_data.Summoners,nom_champ)

  //Voir poour faire une boucle
  let divv = document.createElement("div")
  divv.setAttribute("class","wrapper")

  creation_liste(list_data.Page1.length,list_data.Page1,"Page_rune_1",divv)
  creation_liste(list_data.Page2.length,list_data.Page2,"Page_rune_2",divv)
  creation_liste(list_data.Page3.length,list_data.Page3,"Page_rune_3",divv)

  main_corps.appendChild(divv)

  creation_bottom_page()

}

function creation_top_page(img_champ,img_summoner,name_champ){


  let test = document.createElement("div")
  test.setAttribute("class","summoner")

  new_setAttributes(img,{"src":img_champ,"class":"image_champ"})

  paragraphe.setAttribute("class","Namechamp")

  let text_champ = document.createTextNode(name_champ)
  paragraphe.appendChild(text_champ)

  summoner1.setAttribute("src",img_summoner[0])

  summoner2.setAttribute("src",img_summoner[1])

  new_appendChild(test,[summoner1,summoner2])

  new_appendChild(header,[img,paragraphe,test])

  main_corps.appendChild(header)

}

function creation_liste(size,page,name_class_ul,divv){

  let div = document.createElement("div")
  div.setAttribute("class","Rune_page")

  let ul = document.createElement("ul")
  ul.setAttribute("class",name_class_ul)

  for (var i = 0; i < size ; i++) {
    let li = document.createElement("li")
    let img = document.createElement("img")

    new_setAttributes(img,{"src":page[i],"class":"image_rune"})

    li.appendChild(img)

    ul.appendChild(li)

  }

  div.appendChild(ul)
  divv.appendChild(div)
}

function creation_bottom_page()
{

  back_button.setAttribute("id","Retour")
  new_setAttributes(back_button,{"id":"Retour","class":"Button"})
  footer.appendChild(back_button)
  main_corps.appendChild(footer)

}

function create_main_page()
{

  main_corps.appendChild(champ_name)

  main_corps.appendChild(div_radio)

  main_corps.appendChild(valid_button)
}
