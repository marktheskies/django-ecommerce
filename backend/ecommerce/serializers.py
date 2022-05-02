from rest_framework import serializers

from .models import Category, Product


class ProductListSerializer(serializers.ModelSerializer):
    """Product serializer with no relationship evaluation, to improve efficiency."""

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "category")


class ProductRetrieveSerializer(serializers.ModelSerializer):
    """Product serializer with relationship evaluation, for single Product retrieval."""

    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "category")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "description")
