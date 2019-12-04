import json
import random
from lorem.text import TextLorem

name_gen = TextLorem(srange=(2,2))
text_gen = TextLorem(srange=(1,30))

types = ["Generic","Share", "Image"]

name1 = name_gen.sentence()[:-1]
name2 = name_gen.sentence()[:-1]

obj = dict()
participants = [{"name":name1},{"name":name2}]
obj['participants'] = participants

n_messages = random.randint(10,1000)
messages = []

day = 0
ms_per_day = 86400000L
useName1 = True
for i in range(n_messages):
    msg_obj = dict()
    msg_obj['sender_name'] = name1 if useName1 else name2
    msg_obj['timestamp_ms'] = day * ms_per_day + i
    messages.append

    type = 'Generic'
    # 10% for share, 10% for image
    msg_type = random.randint(1,10)
    if msg_type is 1:
        type = 'Share'
    elif msg_type is 2:
        type = 'Image'
    msg_obj['type'] = type
    msg_obj['content'] = text_gen.sentence()

    # 10% chance for double text
    if random.randint(1,10) > 1:
        useName1 = not useName1

    # 5 % chance to move to the next day
    if random.randint(1,20) is 1:
        day = day + 1

    messages.append(msg_obj)
obj['messages'] = messages

file_name = name1 + '_' + name2 + '.json'
file_name = file_name.replace(' ', '-')

with open(file_name, 'w') as outfile:
    json.dump(obj, outfile)
    print 'Wrote', file_name
