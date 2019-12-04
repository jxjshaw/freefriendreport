import argparse
import json
from jinja2 import Template

class RunInfo:
    def __init__(self, sender_is_grey):
        self.sender_is_grey = sender_is_grey
        self.div_type = 0
        self.length = 1
    def add_length(self, l=1):
        self.length = self.length + l
    def set_top(self):
        self.div_type = 1
    def set_bottom(self):
        self.div_type = 2
    def __str__(self):
        msg_type = 'message'
        # 0 is normal
        # 1 is top
        # 2 is bottom
        if self.div_type == 1:
            msg_type += ' topMessage'
        if self.div_type == 2:
            msg_type += ' bottomMessage'
        msg_color = 'greyMessage' if self.sender_is_grey else 'blueMessage'
        msg_length = '{}px'.format(self.length * 2)
        div = '<div class=\"{} {}\" style=\"height:{}\"></div>'.format(msg_type, msg_color, msg_length)
        return div
class Conversation:
    def __init__(self, friend, ratio, vis):
        self.friend = friend
        self.ratio = ratio
        self.vis = vis

def gen_convos(p):
    blue_name, grey_name = [p['name'] for p in conversation['participants']]
    runs = []
    run = None
    num_friend_messages = 0
    num_your_messages = 0
    sender_is_grey = None
    sender_was_grey = None
    for message in conversation['messages']:
        message_length = len(message['content'])
        if message['sender_name'] == grey_name:
            num_friend_messages = num_friend_messages + message_length
            sender_is_grey = True
        else:
            num_your_messages = num_your_messages + message_length
            sender_is_grey = False
        if run is None:
            run = RunInfo(sender_is_grey)
        else:
            if sender_is_grey is sender_was_grey:
                run.add_length(message_length / 20)
            else:
                runs.append(run)
                # total_messages = num_friend_messages + num_your_messages
                run = RunInfo(sender_is_grey)
        sender_was_grey = sender_is_grey;

    runs[0].set_top()
    runs[-1].set_bottom()
    friendship_score = round(float(num_friend_messages) / float(num_your_messages),2)
    return Conversation(grey_name, friendship_score, '\n'.join([str(r) for r in runs]))

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

    out_file = 'visualizations.html'
    template_file = open('template.html')
    template = Template(template_file.read())
    o = template.render(content=convos)
    with open(out_file, 'w') as outfile:
        outfile.write(o)
