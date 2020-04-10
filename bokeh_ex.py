import numpy as np
from bokeh.plotting import figure, output_file, show, save
from bokeh.io import curdoc, show
from bokeh.models import ColumnDataSource, Grid, ImageURL, LinearAxis, Plot, Range1d, Image
from tqdm import tqdm
import bokeh.models as bmo
from bokeh.palettes import d3
from bokeh.palettes import Spectral10

N = 4000
x = np.random.random(size=N) * 100
y = np.random.random(size=N) * 100
radii = np.random.random(size=N) * 1.5
colors = [
    "#%02x%02x%02x" % (int(r), int(g), 150) for r, g in zip(50+2*x, 30+2*y)
]

TOOLS="hover,crosshair,pan,wheel_zoom,zoom_in,zoom_out,box_zoom,box_select,poly_select,lasso_select,"
p = figure(tools=TOOLS)
# p = figure(plot_width=400, plot_height=400, x_range=(0, 10), y_range=(0, 10))

# p.scatter(x, y, radius=radii,
#           fill_color=colors, fill_alpha=0.6,
#           line_color=None)

aux=np.load('test_data.npz')
softmax = aux['softmax']
preds = aux['predicted_classes']
inputs = aux['X_test']
targets = aux['y_test']
dense_1 = aux['dense_1']
dense_2 = aux['dense_2']

embeds=np.load('test_embeddings.npy')

# a = Image(image=inputs[0].astype(np.uint32), x=x[0], y=y[0])
# a = Image(image= [np.empty((N, N), dtype=np.uint32)], x=x[0], y=y[0])
# N = 20
# img = np.empty((N, N), dtype=np.uint32)
# view = img.view(dtype=np.uint8).reshape((N, N, 4))
# for i in range(N):
#     for j in range(N):
#         view[i, j, 0] = int(255 * i / N)
#         view[i, j, 1] = 158
#         view[i, j, 2] = int(255 * j / N)
#         view[i, j, 3] = 255

palette = d3['Category10'][10]
color_map = bmo.CategoricalColorMapper(factors=[str(c) for c in list(range(10))], palette=palette)
source = ColumnDataSource(data=dict(embeds0=embeds[:,0], embeds1=embeds[:,1], preds=[str(c) for c in preds]))
p.circle(x='embeds0', y='embeds1', size=5, color={'field': 'preds', 'transform': color_map}, source=source)

for i in tqdm(range(len(embeds))):
    if preds[i]==targets[i]:
        continue
    img = inputs[i].astype(np.uint8)
    p.image(image=[img], x=[embeds[i,0]], y=[embeds[i,1]], dw=[5], dh=[5])

output_file("bokeh_ex.html", title="example")
# show(p)  # open a browser
save(p)  # open a browser