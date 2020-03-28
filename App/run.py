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
    data = generate_2d_points(10, 450, 200)
    with open('Tmp/points.csv', 'wb') as f:
        f.write(b'x,y\n')
        np.savetxt(f, data, delimiter=',', fmt='%.2f')
    return render_template("index.html")

@app.route('/Tmp/points.csv', methods=['GET'])
def get_data():
    return send_file('Tmp/points.csv',
                     mimetype='text/csv',
                     attachment_filename='points.csv',
                     as_attachment=True)

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

# @App.route('/Tmp/marvel.json', methods=['GET'])
# def get_data22():
#     print('fafs')
#     return send_file('Tmp/marvel.json',
#                      mimetype='text/json',
#                      attachment_filename='marvel.json',
#                      as_attachment=True)

if __name__ == '__main__':
    app.run(port=8080)