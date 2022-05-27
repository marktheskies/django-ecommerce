from dataclasses import field

from rest_framework import serializers

from .models import Category, Product, ProductAdditionalImage


class ProductListSerializer(serializers.ModelSerializer):
    """Product serializer with no relationship evaluation, to improve efficiency."""

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "category",
            "image",
            "image_title",
        )


class ProductAdditionalImageSerializer(serializers.ModelSerializer):
    """Serializer for additional product images."""

    class Meta:
        model = ProductAdditionalImage
        fields = ("id", "title", "image")


class ProductRetrieveSerializer(serializers.ModelSerializer):
    """Product serializer with relationship evaluation, for single Product retrieval."""

    category = serializers.StringRelatedField()
    additional_images = ProductAdditionalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "category",
            "image",
            "additional_images",
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "description")
