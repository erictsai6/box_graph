from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

import settings
import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'box_graph.views.home', name='home'),
    # url(r'^box_graph/', include('box_graph.foo.urls')),

    url(r'^$', views.index, name='index'),
    #url(r'^watch', views.log_watch, name='log_watch'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
    (r'^assets/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
