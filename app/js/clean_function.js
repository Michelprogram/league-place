//Enlève tout les éléments enfant de element
function clean_page(element)
{
  while (element.firstChild){
    element.removeChild(element.firstChild)
  }
}

const clean_input = (input)=>input.value = ""


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

function clean_button()
{
  valid_button.classList.replace("valid_button","unvalid_button")
  valid_button.disabled = true
}
