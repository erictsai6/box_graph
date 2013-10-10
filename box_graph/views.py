from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context, loader
from django.template import RequestContext
from django.shortcuts import render_to_response

import settings

import logging

logger = logging.getLogger("box_graph.views")

def index(request):

    return render_to_response("index.html", 
    	context_instance=RequestContext(request))
