import numpy as np
import seaborn as sns; sns.set()
import matplotlib.pylab as plt

path = 'Data/'
heatmap_shape = (16, 32)

# diverging heatmap
def div_heatmap(classified, avg_true_class, avg_false_class):
    diff_from_true = np.abs(classified - avg_true_class)
    diff_from_false = np.abs(classified - avg_false_class)

    # for every neuron get smaller difference
    diffs = np.vstack((diff_from_true, diff_from_false))
    min_diff_arg = np.argmin(diffs, axis=0)

    heatmap = np.zeros(np.shape(diffs)[1])

    # create diverging data for heatmap (center = 0)
    for i in range(np.shape(diffs)[1]):
        if min_diff_arg[i]:
            heatmap[i] = diffs[min_diff_arg[i], i] * (-1.0)
        else:
            heatmap[i] = diffs[min_diff_arg[i], i]

    heatmap = np.reshape(heatmap, heatmap_shape)

    cmap = sns.diverging_palette(220, 20, sep=10, as_cmap=True)
    ax = sns.heatmap(heatmap, cmap=cmap, center=0.0, linewidths=.5)
    plt.show()

def div_heatmap_(classified, avg_true_class, avg_false_class):
    diff_from_true = np.abs(classified - avg_true_class)
    diff_from_false = np.abs(classified - avg_false_class)

    heatmap = np.reshape(diff_from_true - diff_from_false, heatmap_shape)
    cmap = sns.diverging_palette(220, 20, sep=10, as_cmap=True)
    ax = sns.heatmap(heatmap, cmap=cmap, center=0.0, linewidths=.5)
    plt.show()


def test_heatmaps(draw_heatmap):
    aux = np.load('../test_data.npz')
    softmax = aux['softmax']
    preds = aux['predicted_classes']
    inputs = aux['X_test']
    targets = aux['y_test']
    dense_1 = aux['dense_1']
    dense_2 = aux['dense_2']

    class_avg_dense_1 = {}
    class_avg_dense_2 = {}
    class_avg_softmax = {}

    for i in range(10):
        class_avg_dense_1[i] = np.genfromtxt(path + 'Dense1/class{}.csv'.format(i), delimiter='\n', skip_header=True)
        class_avg_dense_2[i] = np.genfromtxt(path + 'Dense2/class{}.csv'.format(i), delimiter='\n', skip_header=True)
        class_avg_softmax[i] = np.genfromtxt(path + 'Softmax/class{}.csv'.format(i), delimiter='\n', skip_header=True)

    for i in range(len(preds)):
        if preds[i] != targets[i]:
            # show something falsely classified
            draw_heatmap(dense_1[i,:], class_avg_dense_1[targets[i]], class_avg_dense_1[preds[i]])
            break