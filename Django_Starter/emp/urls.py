from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/emp', views.EmployeeViewSet, basename="emp")
urlpatterns = router.urls