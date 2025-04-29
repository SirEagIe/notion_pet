from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *


class KanbanTypeViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanType.objects.all()
        serializer = KanbanTypeSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanType.objects.all()
        kanban_type = get_object_or_404(queryset, pk=pk)
        serializer = KanbanTypeSerializer(kanban_type)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = KanbanTypeSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanType.objects.all()
        kanban_type = get_object_or_404(queryset, pk=pk)
        kanban_type.delete()
        return Response(status=200)


class KanbanBoardViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanBoard.objects.all()
        serializer = KanbanBoardSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanBoard.objects.all()
        kanban_board = get_object_or_404(queryset, pk=pk)
        if query_params.get('columns'):
            kanban_board.columns = KanbanColumn.objects.filter(board__pk=kanban_board.pk)
            for column in (kanban_board.columns if query_params.get('cards') else []):
                column.cards = KanbanCard.objects.filter(column__pk=column.pk) 
                for card in (column.cards if query_params.get('images') else []):
                    card.images = KanbanCardImage.objects.filter(card__pk=card.pk)
        serializer = KanbanBoardDetailSerializer(kanban_board)
        return Response(serializer.data)

    def create(self, request):
        serializer = KanbanBoardSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanBoard.objects.all()
        kanban_board = get_object_or_404(queryset, pk=pk)
        kanban_board.delete()
        return Response(status=200)


class KanbanColumnViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanColumn.objects.all()
        serializer = KanbanColumnSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanColumn.objects.all()
        kanban_column = get_object_or_404(queryset, pk=pk)
        if query_params.get('cards'):
            kanban_column.cards = KanbanCard.objects.filter(column__pk=kanban_column.pk)
            for card in (kanban_column.cards if query_params.get('images') else []):
                card.images = KanbanCardImage.objects.filter(card__pk=card.pk)
        serializer = KanbanColumnDetailSerializer(kanban_column)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = KanbanColumnSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanColumn.objects.all()
        kanban_column = get_object_or_404(queryset, pk=pk)
        kanban_column.delete()
        return Response(status=200)


class KanbanCardViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanCard.objects.all()
        serializer = KanbanCardSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanCard.objects.all()
        kanban_card = get_object_or_404(queryset, pk=pk)
        if query_params.get('images'):
            kanban_card.images = KanbanCardImage.objects.filter(card__pk=kanban_card.pk)
        serializer = KanbanCardDetailSerializer(kanban_card)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = KanbanCardSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanCard.objects.all()
        kanban_card = get_object_or_404(queryset, pk=pk)
        kanban_card.delete()
        return Response(status=200)


class KanbanCardTagViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanCardTag.objects.all()
        serializer = KanbanCardTagSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanCardTag.objects.all()
        kanban_card_tag = get_object_or_404(queryset, pk=pk)
        serializer = KanbanCardTagSerializer(kanban_card_tag)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = KanbanCardTagSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanCardTag.objects.all()
        kanban_card_tag = get_object_or_404(queryset, pk=pk)
        kanban_card_tag.delete()
        return Response(status=200)


class KanbanCardImageViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = KanbanCardImage.objects.all()
        serializer = KanbanCardImageSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        query_params = dict(request.GET.items())
        queryset = KanbanCardImage.objects.all()
        kanban_card_image = get_object_or_404(queryset, pk=pk)
        serializer = KanbanCardImageSerializer(kanban_card_image)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = KanbanCardImageSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        queryset = KanbanCardImage.objects.all()
        kanban_card_image = get_object_or_404(queryset, pk=pk)
        kanban_card_image.delete()
        return Response(status=200)
