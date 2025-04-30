from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('kanban_type/', views.KanbanTypeViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_types'),
    path('kanban_type/<int:pk>/', views.KanbanTypeViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='kanban_type'),
    path('kanban_board/', views.KanbanBoardViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_boards'),
    path('kanban_board/<int:pk>/', views.KanbanBoardViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='kanban_board'),
    path('kanban_column/', views.KanbanColumnViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_columns'),
    path('kanban_column/<int:pk>/', views.KanbanColumnViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='kanban_column'),
    path('kanban_card/', views.KanbanCardViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_cards'),
    path('kanban_card/<int:pk>/', views.KanbanCardViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='kanban_card'),
    path('kanban_card_tag/', views.KanbanCardTagViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_card_tags'),
    path('kanban_card_tag/<int:pk>/', views.KanbanCardTagViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='kanban_card_tag'),
    path('kanban_card_image/', views.KanbanCardImageViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='kanban_card_images'),
    path('kanban_card_image/<int:pk>/', views.KanbanCardImageViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='kanban_card_image'),
]