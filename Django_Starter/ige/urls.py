from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/ige', views.IGEViewSet, basename='ige')
urlpatterns = router.urls