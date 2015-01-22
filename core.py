import requests, traceback, sys, json
from lxml import html
import traceback
import sys

SETTINGS = json.load(open("settings.json"))
print SETTINGS

class Router(object):

    stat = {"page": "", "tree": ""}
    sample = None
    stat_list = []
    frames = {}
  
    def __init__(self):
        self.router = requests.get(SETTINGS["settings"]["router"]["ip"])
  
    def reboot(self):
        r = requests.post(SETTINGS["settings"]["router"]["pages"]["reboot"],
                          data=SETTINGS["settings"]["router"]["creds"],
                          headers=SETTINGS["settings"]["router"]["header"],
                          auth=(SETTINGS["settings"]["router"]["username"],
                                 SETTINGS["settings"]["router"]["password"]))
        ## Add logging here
        return r
  
    def stats(self):
        index = html.fromstring(self.router.text)
        frame = {"main":"", "page":"", "tree":"", "stats": [], "latest": None}
        frame["main"] = self.get_frame('view', index.xpath('//frame'))[0]
        frame["page"] = requests.get(self.router.url + frame["main"].get('src'))
        frame["tree"] = html.fromstring(frame["page"].text)
  
        for i,x in enumerate(frame["tree"].xpath("//tr//td")[1:]):
            z = x.getchildren()[0]
            z_has_kids = len(z.getchildren()) > 0
            frame["stats"].append(z.getchildren()[0].text if z_has_kids else z.text)
  
        self.remove_frame_headers(frame["stats"])
        frame["latest"] = self.latest(frame["stats"])
        self.frames["stat"] = frame
        return frame["latest"]
 
    def to_nonbreaking(self, val):
        return val.replace("\xc2\xa0", " ")
  
    def latest(self, kvstat):
        return {x:y for (x,y) in zip(kvstat[::2], kvstat[1::2])}
  
    def get_frame(self, frame_name, frames):
        return filter(lambda x: x.get('name') == frame_name, frames)
  
    def remove_frame_headers(self, stats):
        del stats[stats.index('WAN Configuration'):len(stats) - 1]
        del stats[stats.index('DSL')]
        del stats[stats.index(' LAN Configuration ')]

class Page(object):
    pass
