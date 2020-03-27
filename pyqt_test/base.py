from PyQt5 import QtWidgets as qtw
from PyQt5 import QtGui as gui
from PyQt5.QtCore import Qt
import numpy as np
from skimage import io, color
import sys
from colour import Color
from PIL import ImageColor

def generate_2d_points(low, high, n):
    return np.random.uniform(low=low, high=high, size=(n, 2))

def generate_heatmap_data(n, m):
    # first example
    data1 =  np.random.uniform(low=0.0, high=1.0, size=(n, m))
    data2 =  data1 - 0.5

    # second example
    # x = np.linspace(-0.4, 0.4, m)
    # y = np.linspace(-0.4, 0.4, n)
    # data2, yv = np.meshgrid(x, y)

    return data2

class HeatmapWidget(qtw.QWidget):
    def __init__(self, color, data):
        super(HeatmapWidget, self).__init__()
        self.color_data = data
        self.size_x = np.shape(data)[0]
        self.size_y = np.shape(data)[1]
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setColor(gui.QPalette.Window, gui.QColor(color))
        self.setPalette(palette)

        self.gradient_red = list(Color("white").range_to(Color("red"), 5))
        self.gradient_blue = list(Color("white").range_to(Color("blue"), 5))

    def paintEvent(self, event):
        painter = gui.QPainter(self)
        painter.setPen(gui.QPen(Qt.white, 1, Qt.SolidLine))

        width = self.width()
        height = self.height()
        step_w = width / self.size_x
        step_h = height / self.size_y

        for i in range(self.size_x):
            for j in range(self.size_y):
                color = self.color_data[i, j]
                idx = int(10 * color)
                if color < 0:
                    c = ImageColor.getrgb(str(self.gradient_red[-idx]))
                else:
                    c = ImageColor.getrgb(str(self.gradient_blue[idx]))
                painter.setBrush(gui.QBrush(gui.QColor.fromRgbF(c[0]/255.0, c[1]/255.0, c[2]/255.0, 1.0), Qt.SolidPattern))
                painter.drawRect(i * step_w, j * step_h, step_w, step_h)



class PointsWidget(qtw.QWidget):
    def __init__(self, color, pts):
        super(PointsWidget, self).__init__()
        self.pts = pts
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setColor(gui.QPalette.Window, gui.QColor(color))
        self.setPalette(palette)

    def paintEvent(self, event):
        painter = gui.QPainter(self)
        painter.setBrush(gui.QBrush(Qt.red, Qt.SolidPattern))
        for pt in self.pts:
            painter.drawEllipse(pt[0], pt[1], 10, 10)

class MainWindow(qtw.QMainWindow):
    def __init__(self, top, left, width, height, title, pts, heatmap_data1, heatmap_data2):
        super(MainWindow, self).__init__()

        self.top = top
        self.left = left
        self.width = width
        self.height = height
        self.title = title
        self.pts = pts
        self.heatmap_data1 = heatmap_data1
        self.heatmap_data2 = heatmap_data2

        self.setWindowTitle("Visualization")


        heatmap_layout = qtw.QVBoxLayout()
        heatmap_layout.addWidget(HeatmapWidget('gray', self.heatmap_data1))
        heatmap_layout.addWidget(HeatmapWidget('gray', self.heatmap_data2))
        # heatmap_layout.setContentsMargins(10,10,10,10)
        heatmap_layout.setSpacing(20)

        main_layout = qtw.QHBoxLayout()
        main_layout.addWidget(PointsWidget('white', self.pts))
        main_layout.addLayout(heatmap_layout)

        widget = qtw.QWidget()
        widget.setLayout(main_layout)
        self.setCentralWidget(widget)

        self.init_window()

    def init_window(self):
        self.setWindowTitle(self.title)
        self.setGeometry(self.top, self.left, self.width, self.height)
        self.show()

class Point(qtw.QGraphicsEllipseItem):
    def mousePressEvent(self, QMouseEvent):
        print("Hey, you clicked me!")

class Point2(qtw.QGraphicsEllipseItem):
    def mousePressEvent(self, QMouseEvent):
        print("You can click me!")

class GraphicsView(qtw.QGraphicsView):
    pass

def ex1():
    app = qtw.QApplication([])

    pts = generate_2d_points(0, 500, 100)
    heatmap_data1 = generate_heatmap_data(25, 25)
    heatmap_data2 = generate_heatmap_data(25, 25)

    window = MainWindow(150, 150, 1250, 750, "Visualization", pts, heatmap_data1, heatmap_data2)

    sys.exit(app.exec_())

def ex2():
    app = qtw.QApplication([])
    pt = Point()
    pt.setRect( 10, 10, 50, 50)
    pt.setPen(gui.QPen(Qt.yellow) )
    pt.setBrush(Qt.magenta)

    pt2 = Point2()
    pt2.setRect(25, 25, 50, 50)
    pt2.setPen(gui.QPen(Qt.yellow))
    pt2.setBrush(Qt.magenta)

    scene = qtw.QGraphicsScene(0, 0, 100, 100)
    scene.addItem(pt)
    scene.addItem(pt2)

    view = GraphicsView()
    view.setScene(scene)
    view.show()
    sys.exit(app.exec_())
if __name__ == "__main__":
    # ex1()
    ex2()

