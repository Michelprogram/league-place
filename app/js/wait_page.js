const source = document.createElement("source")
const video_bliz = document.createElement("video")

const texte_bliz = document.createTextNode("Blitzcrank va chercher les données")
const paragraphe_bliz = document.createElement("p")

function create_wait_page()
{

  new_setAttributes(source,{"src":"app/mp4/bliz.mp4","type":"video/mp4"})

  video_bliz.appendChild(source)

  new_setAttributes(video_bliz,{"height":"240","width":"240","autoplay":"","loop":""})

  paragraphe_bliz.appendChild(texte_bliz)
  new_appendChild(main_corps,[paragraphe_bliz,video_bliz])
  video_bliz.load()

}
