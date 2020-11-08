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

function who_is_checked(list_button)
{
  let i = 0
  let flag = false
  while (i <= 4 && !flag)
  {
    list_button[i].checked ? flag = true :  null
    i++
  }
  return flag ? list_button[i-1].defaultValue : undefined

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
