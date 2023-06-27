from flask import Flask, render_template, request, jsonify
import xml.dom.minidom
import json 
import random


wordleapp = Flask(__name__)


@wordleapp.route('/')
def index():
    words = []
    f = open("sgb-words.txt", "r")
    for line in f: 
        line = line.strip('\n')
        words.append(line)
    word = random.choice(words)
    sampleword = word 
    return render_template('wordleindex.html', sampleword = sampleword, word = word)


if __name__ == "__main__":
    wordleapp.run(host ="127.0.0.1", port =8080, debug=True)