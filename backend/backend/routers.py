from rest_framework.routers import DefaultRouter, Route


class ReadOnlyRouter(DefaultRouter):
    """
    A custom router which bootstraps readonly API endpoints for a resource.
    """

    routes = [
        Route(
            url=r"^{prefix}$",
            mapping={"get": "list"},
            name="{basename}-list",
            detail=False,
            initkwargs={"suffix": "List"},
        ),
        Route(
            url=r"^{prefix}/{lookup}$",
            mapping={"get": "retrieve"},
            name="{basename}-detail",
            detail=True,
            initkwargs={"suffix": "Detail"},
        ),
    ]
