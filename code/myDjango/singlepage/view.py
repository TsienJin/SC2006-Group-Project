from django_nextjs.render import render_nextjs_page_sync

from django.contrib.auth import logout

def index(request):
    return render_nextjs_page_sync(request)






