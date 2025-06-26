from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from features.views import FeatureAnalysisViewSet, UserViewSet, PortfolioTechnologyViewSet
from .auth_views import LoginView, RegisterView, LogoutView

router = DefaultRouter()
router.register(r'features', FeatureAnalysisViewSet)
router.register(r'users', UserViewSet)
router.register(r'portfolio-technologies', PortfolioTechnologyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 