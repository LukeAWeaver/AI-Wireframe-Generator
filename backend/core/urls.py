from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from features.views import FeatureViewSet

router = DefaultRouter()
router.register(r'features', FeatureViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
] 