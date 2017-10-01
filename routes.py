from flask import Flask, render_template, json, request

import sys
import logging

import numpy as np
import math

import matplotlib
# Set Agg backend, C++ antigrain rendering engine
# Must be called before importing pyplot for the first time
# http://matplotlib.org/faq/howto_faq.html#matplotlib-in-a-web-application-server
matplotlib.use('Agg')
import matplotlib.pyplot as plt
# Interactive mode off
plt.ioff()

# Class for formatting tick precision with '%' formatter
from matplotlib.ticker import FormatStrFormatter

# https://docs.python.org/2.7/library/threading.html#threading.Lock
# Lock() to be used as context manager
from threading import Lock
lock = Lock()

# API for exporting matplotlib graphics to HTML
# https://mpld3.github.io
import mpld3
# for pan, zoom, move
from mpld3 import plugins


def plot_growth(compare_type, lower, upper, width, height):
    """
    Plots comparisons of orders of growth (time complexity as the number of "steps" in control flow)

    Parameters
    ----------
    compare_type: growth rate types to compare, of a notional operation
    lower: lower limit of input size
    upper: upper limit of input size
    width: figure width in inches, "figsize" is a tuple (w,h)
    height: figure height in inches, "figsize" is a tuple (w,h)

    Returns
    --------
    String of html and JS: representation of a matplotlib figure in HTML and D3.js, using fig_to_html (a General Function of mpld3)
    """
    # Explicitly close open figure windows (rcParam `figure.max_num_figures`)
    # http://stackoverflow.com/questions/8213522/matplotlib-clearing-a-plot-when-to-use-cla-clf-or-close
    plt.close( 'all' )

    with lock:

        log= []
        linear = []
        logLinear = []
        quadratic = []
        exponential = []
        for n in range(lower, upper+1):
            log.append(math.log(n, 2))
            linear.append(n)
            logLinear.append(n*math.log(n, 2))
            quadratic.append(n**2)
            exponential.append(2**n)

        fig, ax = plt.subplots( figsize = (math.floor(width), math.floor(height) ), tight_layout = True )

        if compare_type == 'linearLog':
            ax.plot(linear, '#bdcccc', label='linear')
            ax.plot(log, '#B58900', label = 'log')
            ax.legend(loc = 'upper left', fontsize = 'x-large', facecolor = '#657B83')
            ax.grid(True, which = 'both')
            # ax.set_axis_bgcolor('#073642')
            ax.set_facecolor('#073642')
        elif compare_type == 'linearLogLinear':
            ax.plot(logLinear, '#bdcccc', label = 'log-linear')
            ax.plot(linear, '#B58900', label = 'linear')
            ax.legend(loc = 'upper left', fontsize = 'x-large', facecolor = '#657B83')
            ax.grid(True, which = 'both')
            # ax.set_axis_bgcolor('#073642')
            ax.set_facecolor('#073642')
        elif compare_type == 'logLinearQuadratic':
            ax.plot(quadratic, '#bdcccc', label = 'quadratic')
            ax.plot(logLinear, '#B58900', label = 'log-linear')
            ax.legend(loc = 'upper left', fontsize = 'x-large', facecolor = '#657B83')
            ax.grid(True, which = 'both')
            # ax.set_axis_bgcolor('#073642')
            ax.set_facecolor('#073642')
        elif compare_type == 'quadraticExponential':            
            ax.plot(exponential, '#bdcccc', label = 'exponential')
            ax.plot(quadratic, '#B58900', label = 'quadratic')
            # how to make ticklabel precision work?
            # https://stackoverflow.com/a/43528839/5797160
            # https://docs.python.org/3/library/string.html#format-specification-mini-language
            ax.yaxis.set_major_formatter(FormatStrFormatter('%.2f'))

            ax.legend(loc = 'upper left', fontsize = 'x-large', facecolor = '#657B83')
            ax.grid(True, which = 'both')
            # ax.set_axis_bgcolor('#073642')
            ax.set_facecolor('#073642')                         

    return mpld3.fig_to_html(fig)

# create Flask instance for single module
# http://flask.pocoo.org/docs/0.12/quickstart/
app = Flask(__name__)
# log to stdout for heroku local
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.WARNING) # ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL') http://flask.pocoo.org/docs/0.12/errorhandling/

@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/resources/')
# def resources():
#   return render_template('resources.html')

# @app.route('/overview/')
# def overview():
#     return render_template('overview.html')

@app.route('/query', methods=['POST'])
def query():
    data = json.loads(request.data)
    return plot_growth(data["compareType"], data["lowerLimit"], data["upperLimit"], data["plotWidth"], data["plotHeight"])
