import numpy as np
import csv, os, json
from os.path import dirname as getdir
from PIL import Image
import wget, zipfile

path = 'Data/'

def download_data():
    if not os.path.exists('../test_data.npz'):
        print('Downloading test_data.npz')
        wget.download('http://cmp.felk.cvut.cz/~qqpultar/VIZ_data/test_data.npz', '../test_data.npz')
    if not os.path.exists('Data'):
        print('Downloading neural-network data')
        wget.download('http://cmp.felk.cvut.cz/~qqpultar/VIZ_data/Data.zip', 'Data.zip')
        with zipfile.ZipFile('Data.zip', 'r') as zip_ref:
            zip_ref.extractall('.')

class Data_class:
    def __init__(self):
        download_data()

        # load data
        aux = np.load('../test_data.npz')
        self.softmax = aux['softmax']
        self.preds = aux['predicted_classes']
        self.inputs = aux['X_test']
        self.targets = aux['y_test']
        self.dense1 = aux['dense_1']
        self.dense2 = aux['dense_2']

        # average values for neurons in every layer (precomputed)
        self.class_avg_softmax = [np.genfromtxt(path + 'Softmax/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]
        self.class_avg_dense_1 = [np.genfromtxt(path + 'Dense1/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]
        self.class_avg_dense_2 = [np.genfromtxt(path + 'Dense2/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]

        # classification points in 2D (precomputed)
        self.points = np.genfromtxt(path + 'points.csv', delimiter=',', skip_header=True)

    # --following methods pre-process and send requested data to web application--

    def save_softmax(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)
        pred = self.preds[id]
        target = self.targets[id]

        classified = self.softmax[id]

        if pred == target:
            data = np.concatenate((classified, self.class_avg_softmax[pred]), axis=None)
            np.savetxt(path, data, delimiter=',', comments='', header='activation')
            return

        np.savetxt(path, classified, delimiter=',', comments='', header='activation')

    def save_all_softmax(self, path):
        os.makedirs(getdir(path), exist_ok=True)
        classified = self.softmax
        np.savetxt(path, classified, delimiter=',', comments='')

    # prepare data for heatmaps
    def save_dense1(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)

        pred = self.preds[id]
        target = self.targets[id]

        classified = self.dense1[id]
        avg_true_class = self.class_avg_dense_1[target]
        avg_pred_class = self.class_avg_dense_1[pred]

        if pred == target:
            # correctly classified sample
            # case: comparing neuron values of current classification with average classification
            data = np.concatenate((classified, avg_true_class), axis=None)
            np.savetxt(path, data, delimiter=',', comments='', header='activation')
            return

        # case: comparing incorrectly classified sample with average classification values
        diff_from_true = np.abs(classified - avg_true_class)
        diff_from_false = np.abs(classified - avg_pred_class)

        heatmap = diff_from_true - diff_from_false
        np.savetxt(path, heatmap, delimiter=',', comments='', header='activation')

    def save_dense2(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)

        pred = self.preds[id]
        target = self.targets[id]

        classified = self.dense2[id]
        avg_true_class = self.class_avg_dense_2[target]
        avg_pred_class = self.class_avg_dense_2[pred]

        if pred == target:
            # correctly classified sample
            # case: comparing neuron values of current classification with average classification
            data = np.concatenate((classified, avg_true_class))
            np.savetxt(path, data, delimiter=',', comments='', header='activation')
            return

        # case: comparing incorrectly classified sample with average classification values
        diff_from_true = np.abs(classified - avg_true_class)
        diff_from_false = np.abs(classified - avg_pred_class)

        heatmap = diff_from_true - diff_from_false
        np.savetxt(path, heatmap, delimiter=',', comments='', header='activation')

    # send filtered data according to checkboxes and slider options
    def save_ids(self, path, range_min, range_max, checkbox, hideCorrect):
        os.makedirs(getdir(path), exist_ok=True)

        # slider filtering (send only samples where their confidence is in specified range)
        maxs = np.max(self.softmax, axis=1)
        send_ids = np.argwhere((maxs >= range_min) & (maxs <= range_max)).flatten()

        # checkbox filtering
        idx = np.argwhere(np.isin(self.points[send_ids, 2], checkbox)).flatten()
        send_ids = send_ids[idx]

        if hideCorrect:
            idx = np.argwhere(self.preds[send_ids] != self.targets[send_ids]).flatten()
            send_ids = send_ids[idx]

        # instead sending point data we send only indices of points -> works faster
        np.savetxt(path, send_ids, delimiter=',', comments='', header='id')

    # send glyphs (input number pictures)
    def save_image(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)
        img = Image.fromarray(self.inputs[id], 'L')
        img.save(path)


