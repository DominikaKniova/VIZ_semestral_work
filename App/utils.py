import numpy as np
import csv, os, json
from os.path import dirname as getdir


path = 'Data/'

class Data_class:
    def __init__(self):
        aux = np.load('../test_data.npz')
        self.softmax = aux['softmax']
        self.preds = aux['predicted_classes']
        self.inputs = aux['X_test']
        self.targets = aux['y_test']
        self.dense1 = aux['dense_1']
        self.dense2 = aux['dense_2']

        self.class_avg_softmax = [np.genfromtxt(path + 'Softmax/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]
        self.class_avg_dense_1 = [np.genfromtxt(path + 'Dense1/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]
        self.class_avg_dense_2 = [np.genfromtxt(path + 'Dense2/class{}.csv'.format(i), delimiter='\n', skip_header=True) for i in range(10)]

        self.points = np.genfromtxt(path + 'points.csv', delimiter=',', skip_header=True)


    def save_softmax(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)

        classified = self.softmax[id]
        np.savetxt(path, classified, delimiter=',', comments='', header='activation')

    def save_dense1(self, path, id):
        os.makedirs(getdir(path), exist_ok=True)
        pred = self.preds[id]
        target = self.targets[id]

        classified = self.dense1[id]
        avg_true_class = self.class_avg_dense_1[target]
        avg_pred_class = self.class_avg_dense_1[pred]

        if pred == target:
            # print(classified)
            data = np.concatenate((classified, avg_true_class), axis=None)
            np.savetxt(path, data, delimiter=',', comments='', header='activation')
            # print('saved', data.shape)
            return

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
            data = np.concatenate((classified, avg_true_class))
            np.savetxt(path, data, delimiter=',', comments='', header='activation')
            return

        diff_from_true = np.abs(classified - avg_true_class)
        diff_from_false = np.abs(classified - avg_pred_class)

        heatmap = diff_from_true - diff_from_false
        np.savetxt(path, heatmap, delimiter=',', comments='', header='activation')

    def save_points(self, path, range_min, range_max):
        os.makedirs(getdir(path), exist_ok=True)

        maxs = np.max(self.softmax, axis=1)
        args = np.argwhere((maxs > range_min) & (maxs < range_max))

        pts = self.points[args.flatten(), :]
        np.savetxt(path, pts, delimiter=',', comments='', header='x,y,class')