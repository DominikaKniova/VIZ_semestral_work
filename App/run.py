from flask import Flask, render_template, send_file, request
import numpy as np
import csv, os, json
from utils import Data_class

# --this script starts whole web application and receives requests for data--

app = Flask(__name__)

data_class = Data_class()

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/endpoint/vectors.csv', methods=['GET'])
def get_vectors():
    return send_file('Data/vectors.csv',
                     mimetype='text/csv',
                     attachment_filename='vectors.csv',
                     as_attachment=True)

@app.route('/endpoint/ids.csv', methods=['GET'])
def get_filtered_points():
    min = request.args.get('min')
    max = request.args.get('max')
    checkbox = list(request.args.get('checkbox'))
    checkbox = [int(s) for s in checkbox]
    hideCorrect = bool(int(request.args.get('hideCorrect')))
    data_class.save_ids('Tmp/ids.csv', float(min), float(max), np.array(checkbox), hideCorrect)
    return send_file('Tmp/ids.csv', mimetype='text/csv', attachment_filename='ids.csv', as_attachment=True)

@app.route('/endpoint/points.csv', methods=['GET'])
def get_points():
    return send_file('Data/points.csv', mimetype='text/csv', attachment_filename='points.csv', as_attachment=True)

@app.route('/endpoint/data_softmax.csv', methods=['GET'])
def get_softmax_data():
    id = request.args.get('id')
    data_class.save_softmax('Tmp/softmax.csv', int(id))
    return send_file('Tmp/softmax.csv',
                     mimetype='text/csv',
                     attachment_filename='softmax.csv',
                     as_attachment=True)

@app.route('/endpoint/data_dense1.csv', methods=['GET'])
def get_dense1_layer_data():
    id = request.args.get('id')
    data_class.save_dense1('Tmp/dense1.csv', int(id))
    return send_file('Tmp/dense1.csv',
                     mimetype='text/csv',
                     attachment_filename='dense1.csv',
                     as_attachment=True)

@app.route('/endpoint/data_dense2.csv', methods=['GET'])
def get_dense2_layer_data():
    id = request.args.get('id')
    data_class.save_dense2('Tmp/dense2.csv', int(id))
    return send_file('Tmp/dense2.csv',
                     mimetype='text/csv',
                     attachment_filename='dense2.csv',
                     as_attachment=True)

@app.route('/endpoint/image', methods=['GET'])
def get_image():
    id = request.args.get('id')
    data_class.save_image('Tmp/image.png', int(id))
    return send_file('Tmp/image.png', mimetype='Tmp/image.png')

@app.route('/endpoint/all_softmax.csv', methods=['GET'])
def get_all_softmax():
    data_class.save_all_softmax('Tmp/all_softmax.csv')
    return send_file('Tmp/all_softmax.csv', mimetype='text/csv')

if __name__ == '__main__':
    # start application
    app.run(port=8080)