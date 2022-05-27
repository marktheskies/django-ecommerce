from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Category, Product, ProductAdditionalImage


@admin.register(ProductAdditionalImage)
class ProductAdditionalImageAdmin(admin.ModelAdmin):
    list_display = ("product", "title", "image")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" width="150" height="150" style="object-fit:contain" />'
            )
        else:
            return "(No image)"

    image_preview.short_description = "Preview"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "description", "image", "image_title")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
