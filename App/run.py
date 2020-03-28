from flask import Flask, render_template, send_file
import numpy as np
import csv, os

def generate_2d_points(low, high, n):
    return np.random.uniform(low=low, high=high, size=(n, 2))

app = Flask(__name__)

import numpy as np

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

if __name__ == '__main__':
    app.run(port=8080)