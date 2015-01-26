import requests, traceback, sys, json
from lxml import html
import traceback
import sys

class Groute(object):
    SETTINGS = json.load(open("settings.json"))
    ROUTER = SETTINGS["settings"]["router"]

    stat = {"page": "", "tree": ""}
    sample = None
    stat_list = []
    frames = {}
  
    def __init__(self):
        self.router = requests.get(self.ROUTER["ip"])
  
    def reboot(self):
        r = requests.post(self.ROUTER["pages"]["reboot"],
                          data=self.ROUTER["creds"],
                          headers=self.ROUTER["header"],
                          auth=(self.ROUTER["username"],
                                 self.ROUTER["password"]))
        ## Add logging here
        return r

    def stats(self):
        index = html.fromstring(self.router.text)
        frame = {"main":"", "page":"", "tree":"", "stats": [], "latest": None}
        frame["main"] = self.get_frame('view', index.xpath('//frame'))[0]
        frame["page"] = requests.get(self.router.url + frame["main"].get('src'))
        frame["tree"] = html.fromstring(frame["page"].text)
        temp = self.remove_frame_headers(self.extract_fields(frame["tree"]))
        return zip(temp[::2],temp[1::2])

    def rm_extra_info(self):
        return self.stats()[:18]

    def raw_stat_to_dict(self, stat):
        return { stat[0].getchildren()[0].getchildren()[0].text :
                 stat[1].getchildren()[0].text }

    def stats_pp(self):
        return map(self.raw_stat_to_dict, self.rm_extra_info())

    def to_nonbreaking(self, val):
        return val.replace("\xc2\xa0", " ")
  
    def latest(self, kvstat):
        return {x:y for (x,y) in zip(kvstat[::2], kvstat[1::2])}
  
    def get_frame(self, frame_name, frames):
        return filter(lambda x: x.get('name') == frame_name, frames)
  
    def remove_frame_headers(self, stats):
        return filter(lambda x: 'background' not in x.attrib, stats)

    def extract_fields(self,stats):
        return filter(lambda x: x.getchildren()[0].getchildren() is not None, 
                      stats.xpath("//tr//td")[1:])

class Page(object):
    pass
