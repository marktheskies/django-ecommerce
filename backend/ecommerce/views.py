from rest_framework import viewsets

from .models import Category, Product
from .serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductRetrieveSerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_classes = {
        "list": ProductListSerializer,
        "retrieve": ProductRetrieveSerializer,
    }
    queryset = Product.objects.all().order_by("pk")

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
