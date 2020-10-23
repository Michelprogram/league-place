
//Top page
const div_summoners = document.createElement("div")
const img_champion = document.createElement("img")
const paragraphe_name_champion = document.createElement("p")
const text_name_champion = document.createTextNode("")
const summoner1 = document.createElement("img")
const summoner2 = document.createElement("img")
const header = document.createElement("header")
//List rune
const div_liste_runes = document.createElement("div")
//Bottom page
const back_button = document.createElement("button")
const text_button = document.createTextNode("Retour")
back_button.appendChild(text_button)
const footer = document.createElement("footer")

function create_rune_page(list_data,nom_champ)
{

  creation_top_page(list_data.Champ,list_data.Summoners,nom_champ)

  div_liste_runes.setAttribute("class","wrapper")

  creation_liste(list_data.Page1.length,list_data.Page1,"Page_rune_1",div_liste_runes)
  creation_liste(list_data.Page2.length,list_data.Page2,"Page_rune_2",div_liste_runes)
  creation_liste(list_data.Page3.length,list_data.Page3,"Page_rune_3",div_liste_runes)

  main_corps.appendChild(div_liste_runes)

  creation_bottom_page()

}


function creation_top_page(img_champ,img_summoner,name_champ)
{

  //Summoners part
  div_summoners.setAttribute("class","summoner")
  summoner1.setAttribute("src",img_summoner[0])
  summoner2.setAttribute("src",img_summoner[1])
  new_appendChild(div_summoners,[summoner1,summoner2])

  //Champ part
  new_setAttributes(img_champion,{"src":img_champ,"class":"image_champ"})
  paragraphe_name_champion.setAttribute("class","Namechamp")
  text_name_champion.nodeValue = name_champ
  paragraphe_name_champion.appendChild(text_name_champion)

  //Assemblage dans un header
  new_appendChild(header,[img_champion,paragraphe_name_champion,div_summoners])

  //Ajout a la balise main html
  main_corps.appendChild(header)

}


function creation_liste(size,page,name_class_ul,divv)
{

  let div_runes = document.createElement("div")
  div_runes.setAttribute("class","Rune_page")

  let ul = document.createElement("ul")
  ul.setAttribute("class",name_class_ul)

  for (var i = 0; i < size ; i++)
  {
    let li = document.createElement("li")
    let img = document.createElement("img")

    new_setAttributes(img,{"src":page[i],"class":"image_rune"})

    li.appendChild(img)

    ul.appendChild(li)

  }

  div_runes.appendChild(ul)
  divv.appendChild(div_runes)
}

function creation_bottom_page()
{

  back_button.setAttribute("id","Retour")
  new_setAttributes(back_button,{"id":"Retour","class":"Button"})
  footer.appendChild(back_button)
  main_corps.appendChild(footer)

}



back_button.addEventListener('click',()=>{
  clean_page(main_corps)
  create_main_page()
})
