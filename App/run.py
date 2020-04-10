from flask import Flask, render_template, send_file, request
import numpy as np
import csv, os, json
from utils import Data_class

from heatmaps import *

def generate_2d_points(low, high, n):
    return np.random.uniform(low=low, high=high, size=(n, 2))

app = Flask(__name__)

data_class = Data_class()

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/endpoint/vectors.csv', methods=['GET'])
def get_data2():
    return send_file('Data/vectors.csv',
                     mimetype='text/csv',
                     attachment_filename='vectors.csv',
                     as_attachment=True)

@app.route('/endpoint/ids.csv', methods=['GET'])
def get_data3():
    min = request.args.get('min')
    max = request.args.get('max')
    checkbox = list(request.args.get('checkbox'))
    checkbox = [int(s) for s in checkbox]
    hideCorrect = bool(int(request.args.get('hideCorrect')))
    data_class.save_ids('Tmp/ids.csv', float(min), float(max), np.array(checkbox), hideCorrect)
    return send_file('Tmp/ids.csv', mimetype='text/csv', attachment_filename='ids.csv', as_attachment=True)

@app.route('/endpoint/points.csv', methods=['GET'])
def find_some_funny_quote_later():
    return send_file('Data/points.csv', mimetype='text/csv', attachment_filename='points.csv', as_attachment=True)

@app.route('/endpoint/data_softmax.csv', methods=['GET'])
def what_is_my_purpose():
    id = request.args.get('id')
    data_class.save_softmax('Tmp/softmax.csv', int(id))
    return send_file('Tmp/softmax.csv',
                     mimetype='text/csv',
                     attachment_filename='softmax.csv',
                     as_attachment=True)

@app.route('/endpoint/data_dense1.csv', methods=['GET'])
def you_pass_the_butter():
    id = request.args.get('id')
    data_class.save_dense1('Tmp/dense1.csv', int(id))
    return send_file('Tmp/dense1.csv',
                     mimetype='text/csv',
                     attachment_filename='dense1.csv',
                     as_attachment=True)

@app.route('/endpoint/data_dense2.csv', methods=['GET'])
def oh_my_god():
    id = request.args.get('id')
    data_class.save_dense2('Tmp/dense2.csv', int(id))
    return send_file('Tmp/dense2.csv',
                     mimetype='text/csv',
                     attachment_filename='dense2.csv',
                     as_attachment=True)

@app.route('/endpoint/image', methods=['GET'])
def gimme_dat_image():
    id = request.args.get('id')
    data_class.save_image('Tmp/image.png', int(id))
    return send_file('Tmp/image.png', mimetype='Tmp/image.png')

@app.route('/data_receiver', methods = ['POST'])
def get_js_data():
    data = json.loads(request.form['js_data'])
    # so far we are picking only one point, so in data there is only one item
    data = data[0]
    result = "Clicked on point from class {}, x={} y={}".format(str(data['class']), str(data['x']), str(data['y']))
    # something has to be returned as response. Maybe later we will handle more scenarios (eg. when received data not correct etc.)
    return result

if __name__ == '__main__':
    # test_heatmaps(div_heatmap) # distance to the closer class
    # test_heatmaps(div_heatmap_) # distance to one class minus distance to other class
    app.run(port=8080)