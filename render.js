const valid_button = document.querySelector("#Valider")
const champ_name = document.querySelector("#champ_name")
const role_Button = document.querySelectorAll(".role_Button")
const img_role = document.querySelectorAll("img.img_role")
const div_radio = document.querySelector(".radio_box")
const main_corps = document.querySelector("main")

const button_test = new Button_role(role_Button)


let list_champ = null

valid_button.addEventListener('click',()=>{
  clean_page(main_corps)
  create_wait_page()
  get_data(champ_name.value,button_test.who_is_checked()).then((list_data)=>{
    clean_select_button(role_Button,img_role)
    clean_page(main_corps)
    create_rune_page(list_data,champ_name.value)
    clean_input(champ_name)
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


function create_main_page()
{
  new_appendChild(main_corps,[champ_name,div_radio,valid_button])
}
