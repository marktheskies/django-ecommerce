from email.mime import image
from itertools import product

from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=9)
    category = models.ForeignKey(
        "Category",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )
    image = models.ImageField(upload_to="product-images")
    image_title = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class ProductAdditionalImage(models.Model):
    image = models.ImageField(upload_to="product-images-additional")
    title = models.CharField(max_length=50)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="additional_images"
    )

    def __str__(self) -> str:
        return f"{self.product.name} - {self.title}"


class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name
