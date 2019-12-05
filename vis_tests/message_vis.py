import argparse
import json
from jinja2 import Template

MESSAGE_UNIT_PX = 10
MESSAGE_BORDER_RADIUS = 10

GLOBAL_PATH_CTR = 0

class RunInfo:
    def __init__(self, sender_is_grey):
        self.sender_is_grey = sender_is_grey
        self.is_top = False
        self.is_bottom = False
        self.length = 1
    def add_length(self, l=1):
        self.length = self.length + l
    def __str__(self):
        msg_color = 'greyMessage' if self.sender_is_grey else 'blueMessage'
        msg_length = '{}px'.format(self.length * MESSAGE_UNIT_PX)
        # div = '<div class=\"message {}\" style=\"height:{};border-radius:{}\"></div>'.format(msg_color, msg_length, ' '.join(border_radii))
        div = '<div class=\"message {}\" style=\"height:{};\"></div>'.format(msg_color, msg_length)
        return div

class SectionInfo:
    def __init__(self):
        self.runs = []
        self.size = 0
    def add_run(self, r):
        self.runs.append(r)
        self.size = self.size + r.length
    def is_empty(self):
        return len(self.runs) == 0
    def get_size(self):
        return self.size * MESSAGE_UNIT_PX
    def get_content(self):
        return '\n'.join([str(r) for r in self.runs])


class Conversation:
    def __init__(self, friend, ratio, vis):
        self.friend = friend
        self.ratio = ratio
        self.vis = vis

def gen_convos(conversation):
    blue_name, grey_name = [p['name'] for p in conversation['participants']]
    visualization = []
    section = SectionInfo()
    run = None
    num_friend_messages = 0
    num_your_messages = 0
    sender_is_grey = None
    sender_was_grey = None
    curr_day = None
    prev_day = None
    ms_per_day = 86400000L
    for message in conversation['messages']:
        message_length = len(message['content'])
        curr_day = message['timestamp_ms'] / ms_per_day
        if message['sender_name'] == grey_name:
            num_friend_messages = num_friend_messages + message_length
            sender_is_grey = True
        else:
            num_your_messages = num_your_messages + message_length
            sender_is_grey = False
        if run is None:
            run = RunInfo(sender_is_grey)
        else:
            if curr_day == prev_day:
                if sender_is_grey is sender_was_grey:
                    run.add_length(message_length / 20)
                else:
                    section.add_run(run)
                    # total_messages = num_friend_messages + num_your_messages
                    run = RunInfo(sender_is_grey)
            else:
                section.add_run(run)
                visualization.append(section)
                section = SectionInfo()
                run = RunInfo(sender_is_grey)
                run.add_length(message_length / 20)

        sender_was_grey = sender_is_grey;
        prev_day = curr_day

    section.add_run(run)
    visualization.append(section)
    content = []
    with open("path_template.html") as path_file:
        path_template = Template(path_file.read())
        for sect in visualization:
            clip_id = "clip_{}".format(GLOBAL_PATH_CTR)
            o = path_template.render(content=sect.get_content(),height=sect.get_size(),width=150,radius=MESSAGE_BORDER_RADIUS,clip_id=clip_id)
            content.append(o)
            globals()['GLOBAL_PATH_CTR'] = GLOBAL_PATH_CTR + 1

    friendship_score = round(float(num_friend_messages) / float(num_your_messages),2)
    return Conversation(grey_name, friendship_score, '\n'.join(content))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate an HTML page for message visualization.')
    # parser.add_argument('file', help='files to visualize')
    parser.add_argument('files', metavar='file', nargs='+', help='files to visualize')

    args = parser.parse_args()

    convos = []
    for file_name in args.files:
        with open(file_name) as data_file:
            conversation = json.loads(data_file.read())
            convos.append(gen_convos(conversation))

    out_file = 'index.html'
    template_file = open('template.html')
    template = Template(template_file.read())
    o = template.render(content=convos)
    with open(out_file, 'w') as outfile:
        outfile.write(o)
