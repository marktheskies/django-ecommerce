import random
from concurrent.futures import ThreadPoolExecutor
from decimal import Decimal
from pathlib import Path
from typing import Any, Optional
from uuid import uuid4

import requests
import yaml
from django.core.files.images import ImageFile
from django.core.management.base import BaseCommand, CommandParser
from django.db.utils import IntegrityError
from faker import Faker
from faker.providers import BaseProvider

from ...models import Category, Product, ProductAdditionalImage


class EcommerceProvider(BaseProvider):
    def __init__(self, generator: Any) -> None:
        data_path = Path(__file__).with_name("seed.yaml")
        with open(data_path) as fh:
            self.data = yaml.safe_load(fh)
        super().__init__(generator)

    def ecommerce_name(self):
        product = self.random_element(self.data["product_name"]["product"])
        adjective = self.random_element(self.data["product_name"]["adjective"])
        material = self.random_element(self.data["product_name"]["material"])

        choices = [
            product,
            " ".join([adjective, product]),
            " ".join([material, product]),
            " ".join([adjective, material, product]),
        ]

        names = random.choices(choices, k=1)
        return names[0]

    def ecommerce_department(self):
        return self.random_element(self.data["department"])

    def ecommerce_price(self, as_int: bool = True):
        n = self.random_int(min=100, max=9999999)
        return round(n, 2) if as_int else n / 100


class Command(BaseCommand):
    help = "Seeds the database with fake data."

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "--num-categories",
            "-c",
            type=int,
            default=20,
            help="""Number of categories to create. This probably won't create
            this many categories as category creation is skipped if names
            aren't unique. To mitigate this, create more departments in
            seed.yaml.""",
        )
        parser.add_argument("--num-products-per-category", "-p", type=int, default=100)

    def _download_and_save_product_images(
        self, product: Product, image_url: str
    ) -> Product:
        r = requests.get(image_url, stream=True)
        product.image.save(f"{uuid4()}.jpg", ImageFile(r.raw))
        product.image_title = product.name
        product.save()

        for i in range(2):
            r = requests.get(image_url, stream=True)
            pai = ProductAdditionalImage()
            pai.product = product
            pai.title = f"{product.name} {i + 1}"
            pai.save()
            pai.image.save(f"{uuid4()}.jpg", ImageFile(r.raw))

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        fake = Faker()
        fake.add_provider(EcommerceProvider)

        categories = []
        for _ in range(options["num_categories"]):
            try:
                categories.append(
                    Category.objects.create(
                        name=fake.ecommerce_department(),
                        description="\n".join(
                            fake.paragraph(nb_sentences=4) for _ in range(4)
                        ),
                    )
                )
            except IntegrityError:
                continue

        products = []
        for c in categories:
            products += Product.objects.bulk_create(
                Product(
                    name=fake.ecommerce_name(),
                    description="\n".join(
                        fake.paragraph(nb_sentences=4) for _ in range(4)
                    ),
                    price=Decimal(fake.random.randint(1000, 10000) / 100),
                    category=c,
                )
                for _ in range(options["num_products_per_category"])
            )

        with ThreadPoolExecutor(20) as executor:
            urls = ["https://picsum.photos/400/500.jpg" for _ in products]
            executor.map(self._download_and_save_product_images, products, urls)
