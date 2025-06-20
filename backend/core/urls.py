from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from features.views import FeatureViewSet, UserViewSet

router = DefaultRouter()
router.register(r'features', FeatureViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
] 