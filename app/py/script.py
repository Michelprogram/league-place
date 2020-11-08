#https://www.op.gg/champion/leblanc/statistics/top

from bs4 import BeautifulSoup
from requests import get
from sys import argv
from json import dumps

class Scraping_OPGG:

    formatage_link = staticmethod(lambda link :"https:"+link)

    def __init__(self,nom_perso,poste):
        self.nom_perso = nom_perso
        self.poste = poste

        self.rune_fondamentales = {}
        self.rune_secondaires = {}
        self.rune_tierce = {}

        self.summoner = []

        self.info = None
        self.soup = None

        self.__get_html()

    def __get_html(self):
        code_html = get(f"https://www.op.gg/champion/{self.nom_perso}/statistics/{self.poste}")
        self.soup = BeautifulSoup(code_html.text,"html.parser")


    def Rune(self):
        perk_page_wrap = self.soup.select("tbody.tabItem:nth-child(4) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)")
        perk_page = perk_page_wrap[0].find_all("div","perk-page")

        for i in range(len(perk_page)):
            perk_page_row = perk_page[i].find_all("div",class_="perk-page__item--active")

            for j in range(len(perk_page_row)):
                lien = Scraping_OPGG.formatage_link(perk_page_row[j].find("img")['src'])
                name_rune = perk_page_row[j].find("img")["alt"]
                if i == 0:
                    self.rune_fondamentales[name_rune] = lien
                else:
                    self.rune_secondaires[name_rune] = lien

    def Rune_tierce(self):
        fragment_page = self.soup.select("tbody.tabItem:nth-child(4) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1) > div:nth-child(5)")
        all_image = fragment_page[0].find_all("img",class_="active")
        for i in range(len(all_image)):
            lien = Scraping_OPGG.formatage_link(all_image[i]["src"])
            name_rune = all_image[i]["alt"]
            if name_rune in self.rune_tierce:
                self.rune_tierce[name_rune+"1"] = lien
            self.rune_tierce[name_rune] = lien

    def Champ_info(self):
        header = self.soup.select(".champion-stats-header-info")
        img_champ = header[0].findChildren("div","champion-stats-header-info__image")
        self.info = Scraping_OPGG.formatage_link(img_champ[0].find("img")['src'])

    def Summoner(self):
        self.__get_html()
        ul_summoner = self.soup.select(".champion-overview__table--summonerspell > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > ul:nth-child(1)")
        all_li = ul_summoner[0].find_all("li")
        for i in range(0,len(all_li),2):
            self.summoner.append(Scraping_OPGG.formatage_link(all_li[i].find("img")['src']))


    def ecriture(self):
        with open("app/json/data.json","w") as file:
            dictionnary = {
                    "Summoners":self.summoner,
                    "Champ":self.info,
                    "Page1":self.rune_fondamentales,
                    "Page2":self.rune_secondaires,
                    "Page3":self.rune_tierce
            }
            file.write(dumps(dictionnary,indent=2))


scrap = Scraping_OPGG(argv[1], argv[2])
scrap.Rune()
scrap.Rune_tierce()
scrap.Champ_info()
scrap.Summoner()
scrap.ecriture()
