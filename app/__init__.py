from flask import Flask, render_template, send_file
import numpy as np
import csv

def generate_2d_points(low, high, n):
    return np.random.uniform(low=low, high=high, size=(n, 2))

app = Flask(__name__)

@app.route('/')
def index():
    data = generate_2d_points(10, 450, 200)
    with open('data/points.csv', 'wb') as f:
        f.write(b'x,y\n')
        np.savetxt(f, data, delimiter=',', fmt='%.2f')
    return render_template("simple.html")

@app.route('/data/points.csv', methods=['GET'])
def get_data():
    return send_file('data/points.csv',
                     mimetype='text/csv',
                     attachment_filename='points.csv',
                     as_attachment=True)

if __name__ == '__main__':
    app.run()