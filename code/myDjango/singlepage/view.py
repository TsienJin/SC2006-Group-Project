from django_nextjs.render import render_nextjs_page_sync
from django.contrib.auth import logout
from django.http import HttpResponse
import datetime

def index(request):
    # front end page sync
    page = render_nextjs_page_sync(request)
    # dummy front end
    now  = datetime.datetime.now()
    dummy = "<html><body> It is now %s.</body></html>" % now
    return HttpResponse(dummy)






