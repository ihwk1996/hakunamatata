from flask import Flask, request, jsonify
import json
import requests
from flask_cors import CORS
import speech_recognition as sr
from textblob import TextBlob
import time
import os





app = Flask(__name__)
CORS(app)

@app.route('/', methods=["POST"])
def hello_world():
    print('ada')
    print(request.get_data())
    print(reques.data)
    print(request.get_json())
    print(request.json)
    return 'Hello, World!'

@app.route('/audio',methods=["POST"])
def audio():
    time.sleep(1)
    print(request.get_json())
    print(request.json)
    x = request.json

    print(type(x))
    print(x['url'])
    url = x['url']
    # r = requests.get(url)
    # print(type(r))
    # print(r)
    try:
        r = sr.Recognizer()
        died = sr.AudioFile('/Users/ivanho/Downloads/hackhlth.wav')
        with died as source:
            audio = r.record(source)
        x = r.recognize_google(audio)
        print(x)
        m = TextBlob(x)
        print(m.sentiment.polarity)
        p = m.sentiment.polarity
    except:
        empty = {
            'polarity': 0,
            'para': 'Nothing read! Try again!'

        }
        return jsonify(empty)
    finally:
        os.remove('/Users/ivanho/Downloads/hackhlth.wav')
        print("File Removed!")


    data = {
        'polarity': p,
        'para': x
    }
    # resp = make_response(data) #here you could use make_response(render_template(...)) too
    return jsonify(data)
