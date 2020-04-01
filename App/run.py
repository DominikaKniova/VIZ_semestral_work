from flask import Flask, render_template, send_file, request
import numpy as np
import csv, os
import json

from heatmaps import test_heatmaps

def generate_2d_points(low, high, n):
    return np.random.uniform(low=low, high=high, size=(n, 2))

app = Flask(__name__)

def cart2pol(x, y):
    rho = np.sqrt(x**2 + y**2)
    phi = np.arctan2(y, x)
    return(rho, phi)

def pol2cart(r, phi):
    x = r * np.cos(phi)
    y = r * np.sin(phi)
    return(x, y)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/Data/vectors.csv', methods=['GET'])
def get_data2():
    return send_file('Data/vectors.csv',
                     mimetype='text/csv',
                     attachment_filename='vectors.csv',
                     as_attachment=True)

@app.route('/Data/points.csv', methods=['GET'])
def get_data3():
    return send_file('Data/points.csv',
                     mimetype='text/csv',
                     attachment_filename='points.csv',
                     as_attachment=True)

@app.route('/data_receiver', methods = ['POST'])
def get_js_data():
    data = json.loads(request.form['js_data'])
    # so far we are picking only one point, so in data there is only one item
    data = data[0]
    result = "Clicked on point from class {}, x={} y={}".format(str(data['class']), str(data['x']), str(data['y']))
    print(result)
    # something has to be returned as response. Maybe later we will handle more scenarios (eg. when received data not correct etc.)
    return result

if __name__ == '__main__':
    test_heatmaps()
    # app.run(port=8080)