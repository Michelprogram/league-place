const fs = require("fs")
const spawn = require("child_process").spawn

function get_data (champ_name,poste){
    return new Promise((succes,fail)=>{
    const python = spawn('python3.7',["app/py/script.py",champ_name,poste])
    python.on('exit',()=>{
      fs.readFile('app/json/data.json','utf-8',(err, data)=>{
        err ? fail(err) : succes(JSON.parse(data.toString()))
      })

    })
  })
}
class Button_role
{
  constructor (list_button)
  {
    this.list_button = list_button
  }

  one_is_checked()
  {
    let flag = false
    for (var i = 0; i < this.list_button.length; i++) {
      if (this.list_button[i].checked)
      {
        flag = true
      }
    }

    return flag
  }

  who_is_checked()
  {
    let i = 0
    while (!this.list_button[i].checked || i > 4)
    {
      i++
    }
    return this.list_button[i].defaultValue
  }


}

function clean_input(input)
{
  input.value = ""
}

function clean_select_button(list_radio_button,list_img)
{
  for (var i = 0; i < list_radio_button.length; i++)
  {
    list_radio_button[i].checked = false
    try
    {
      list_img[i].classList.replace("img_role_select","img_role")
    }
    catch(err){}
  }
}



function get_champ_name(callback)
{
  let list_champions = []
  let tempo_letter,tempo_champ
    fs.readFile("app/json/champions.json","utf8",(error,data)=>{
      if (error)
      {
        console.log("erreur d'ouverture du fichier")
      }
      else
      {
        data = JSON.parse(data.toString())
        for (var i = 0; i < data.length; i++)
        {
        tempo_letter = data[i].id[0].toUpperCase()
        tempo_champ = data[i].id
        tempo_champ = tempo_letter + tempo_champ.substring(1,tempo_champ.length)
        list_champions.push(tempo_champ)
        }
        callback(list_champions)
      }
  })

}

function get_list_champ()
{
  return new Promise((succes,fail)=>{
    if (fail)
    {
      fail("une erreur")
    }
    else
    {
      let request = new XMLHttpRequest()
      request.onreadystatechange = ()=>{
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
          let data = JSON.parse(request.responseText)
          succes(Object.keys(data.data))
        }
      }
      request.open("GET","http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json")
      request.send()
    }
  })
}

function new_appendChild(source,list_child)
{
  for (var i = 0; i < list_child.length; i++) {
    source.appendChild(list_child[i])
  }
}

function new_setAttributes(source,list_dict)
{
  for (var [key,value] of Object.entries(list_dict)) {
      source.setAttribute(key,value)
  }
}

//Enlève tout les éléments de la page
function clean_page(element)
{
  while (element.firstChild){
    element.removeChild(element.firstChild)
  }
}

module.exports = { Button_role,clean_input,clean_select_button,get_champ_name,get_data,get_list_champ,new_appendChild,clean_page,new_setAttributes }
