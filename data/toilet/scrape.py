import sys
import re

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By



class Writer:
  def __init__(self) -> None:
    pass



class Toilet:
  def __init__(self, element) -> None:
    self.element = element

    self.type = self.element[0].text
    self.name = self.element[1].text
    self.addr = re.sub(',', '', self.element[2].text)
    self.link = ""


    try:
      self.link = self.element[1].find_element(By.TAG_NAME, 'a').get_attribute('href')
    except Exception as e:
      self.link = ""
          
    
  def toCSV(self) -> str:
    return f"{self.name},{self.addr},{self.type},{self.link}"
    



class App:
  def __init__(self) -> None:
    self.target = "https://www.toilet.org.sg/loomapdirectory"
    self.driver = webdriver.Firefox()
    
    
  def __connect(self, url) -> None:
    try:
      self.driver.get(url)
    except Exception as e:
      print(e)
      
  def __showTables(self) -> None:
    self.driver.execute_script("""
                              $('ul.tabs-content').children().addClass('active')
                               """)
      
  def forceClose(self) -> None:
    self.driver.quit()
      
  def main(self) -> None:
    self.__connect(self.target)
    self.__showTables()
    
    elements = self.driver.find_elements(By.CLASS_NAME, "tab__content")

    for element in elements:
      tableBody = element.find_element(By.TAG_NAME, 'tbody')
      rows = tableBody.find_elements(By.TAG_NAME, 'tr')
      
      for row in rows:
        cells = row.find_elements(By.TAG_NAME, 'td')
        thing = Toilet(cells)
        print(thing.toCSV())
      
    

    
    
    
if __name__ == "__main__":
  app = App()
  
  try:
    app.main()
  finally:
    app.forceClose()
    print('done')