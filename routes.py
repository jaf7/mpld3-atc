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

# https://docs.python.org/2.7/library/threading.html#threading.Lock
# Lock() to be used as context manager
from threading import Lock
lock = Lock()

# API for exporting matplotlib graphics to HTML
# https://mpld3.github.io
import mpld3
# for pan, zoom, move
from mpld3 import plugins


def plot_growth(bound_types, lower, upper):
    """
    Plots comparisons of orders of growth (time complexity)

    Parameters
    ----------
    bound_types: growth rate types to compare, of a notional function
    lower: lower limit of input size
    upper: upper limit of input size

    Returns
    --------
    String of html and JS: representation of a matplotlib figure in HTML and D3js, using fig_to_html
    """
    with lock:

        log= []
        linear = []
        quadratic = []
        logLinear = []
        exponential = []
        for n in range(lower, upper+1):
            log.append(math.log(n, 2))
            linear.append(n)
            logLinear.append(n*math.log(n, 2))
            quadratic.append(n**2)
            exponential.append(2**n)

        fig, ax = plt.subplots()
        if bound_types == 'linear_and_log':
            ax.plot(log, label = 'log')
            ax.plot(linear, label='linear')
            ax.legend(loc = 'upper left')
            ax.grid(True, which = 'both')
            ax.set_axis_bgcolor('#FFF8DC')
        elif bound_types == 'linear_and_log-linear':
            ax.plot(linear, label = 'linear')
            ax.plot(logLinear, label = 'log-linear')
            ax.legend(loc = 'upper left')
            ax.grid(True, which = 'both')
            ax.set_axis_bgcolor('#FFF8DC')
        elif bound_types == 'log-linear_and_quadratic':
            ax.plot(logLinear, label = 'log-linear')
            ax.plot(quadratic, label = 'quadratic')
            ax.legend(loc = 'upper left')
            ax.grid(True, which = 'both')
            ax.set_axis_bgcolor('#FFF8DC')
        elif bound_types == 'quadratic_and_exponential':
            ax.plot(quadratic, label = 'quadratic')
            ax.plot(exponential, label = 'exponential')
            ax.legend(loc = 'upper left')
            ax.grid(True, which = 'both')
            ax.set_axis_bgcolor('#FFF8DC')
        # can't set y-axis ticklabels padding correctly
        # elif bound_types == 'semi_quadratic_and_exponential':
        #     ax.plot(quadratic, label = 'quadratic')
        #     ax.plot(exponential, label = 'exponential')
        #     ax.semilogy()
        #     ax.legend(loc = 'upper left')
        #     ax.grid(True, which = 'both')
        #     ax.set_axis_bgcolor('#FFF8DC')

    return mpld3.fig_to_html(fig)


app = Flask(__name__)
# log to stdout for heroku local
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    data = json.loads(request.data)
    return plot_growth(data["bound_types"], 1, 500)
