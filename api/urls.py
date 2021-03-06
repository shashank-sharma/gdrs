from django.conf.urls import url, include
from client import views as clientviews
from accounts import views as accountviews
from api.views import UserViewSet, nearest_request, GarbageStatusUpdate, nearest_request_group


urlpatterns = [
    url(r'^login', accountviews.login),
    url(r'^users', UserViewSet),
    url(r'^nearest_request_group', nearest_request_group),
    url(r'^nearest_request', nearest_request),
    url(r'^driver_login', accountviews.driver_login),
    url(r'^client_login_check', accountviews.client_login_check),
    url(r'^client_login', accountviews.login),
    url(r'^garbage_status_update', GarbageStatusUpdate.as_view())
]