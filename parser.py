import sys

sys.path.insert(1,"C:\\Users\\Kevino\\source\\beautifulsoup4-4.8.0")

from bs4 import BeautifulSoup
import json

def parse_fb_conversation(conversation):
    # TODO add conversation top level data
    conversation_data = {}
    conversation_data['title'] = conversation.title.string[18:]
    conversation_data['messages'] = []

    messages = soup.find_all("div", {"class": "message"})
    # m = messages[0]
    for m in messages:
        data = m.find_all("span")

        message_data = {
            'sender': data[0].string,
            'meta' : data[1].string,
            'text' : m.next_sibling.string
        }

        conversation_data['messages'].append(message_data)

    return conversation_data

json_data = {}
json_data['conversations'] = []

datafiles = [317, 494, 545, 546, 551]


for d in datafiles:
    html_doc = open("C:\\Users\\Kevino\\Downloads\\facebook-Sunkaiwen\\messages\\{}.html".format(d))
    soup = BeautifulSoup(html_doc, 'html.parser')
    conv = parse_fb_conversation(soup)
    json_data['conversations'].append(conv)

with open('data.json', 'w') as outfile:
    json.dump(json_data, outfile)
