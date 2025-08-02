from django.urls import path
from .views import RegisterView, BlogViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path('auth/signup/', RegisterView.as_view(), name='signup'),
    
]

urlpatterns += router.urls  # ✅ Append router URLs after defining urlpatterns


