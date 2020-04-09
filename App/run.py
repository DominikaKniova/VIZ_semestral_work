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

@app.route('/endpoint/points.csv', methods=['GET'])
def get_data3():
    min = request.args.get('min')
    max = request.args.get('max')
    checkbox = list(request.args.get('checkbox'))
    checkbox = [int(s) for s in checkbox]
    data_class.save_points('Tmp/points.csv', float(min), float(max), np.array(checkbox))
    return send_file('Tmp/points.csv',
                     mimetype='text/csv',
                     attachment_filename='points.csv',
                     as_attachment=True)

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


# a="""(
#     (0.40392156862745099,  0.0                ,  0.12156862745098039),
#     (0.69803921568627447,  0.09411764705882353,  0.16862745098039217),
#     (0.83921568627450982,  0.37647058823529411,  0.30196078431372547),
#     (0.95686274509803926,  0.6470588235294118 ,  0.50980392156862742),
#     (0.99215686274509807,  0.85882352941176465,  0.7803921568627451 ),
#     (0.96862745098039216,  0.96862745098039216,  0.96862745098039216),
#     (0.81960784313725488,  0.89803921568627454,  0.94117647058823528),
#     (0.5725490196078431 ,  0.77254901960784317,  0.87058823529411766),
#     (0.2627450980392157 ,  0.57647058823529407,  0.76470588235294112),
#     (0.12941176470588237,  0.4                ,  0.67450980392156867),
#     (0.0196078431372549 ,  0.18823529411764706,  0.38039215686274508)
#     )
# """
# a = a.replace('(','[')
# a = a.replace(')',']')
# print(a)