from rest_framework import serializers
from .models import *


class KanbanCardTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanCardTag
        fields = ["id", "name"]
        read_only_fields = ["id"]


class KanbanCardImageSerializer(serializers.ModelSerializer):
    card = serializers.SlugRelatedField(
        queryset=KanbanCard.objects.all(), slug_field='id', required=True
    )

    class Meta:
        model = KanbanCardImage
        fields = ["id", "image", "card"]
        read_only_fields = ["id"]


class KanbanCardSerializer(serializers.ModelSerializer):
    column = serializers.SlugRelatedField(
        queryset=KanbanColumn.objects.all(), slug_field='id', required=True
    )
    tag = serializers.SlugRelatedField(
        queryset=KanbanCardTag.objects.all(), slug_field='name', required=False, many=True
    )

    class Meta:
        model = KanbanCard
        fields = ["id", "title", "text", "column", "tag", "position"]
        read_only_fields = ["id"]


class KanbanCardDetailSerializer(serializers.ModelSerializer):
    tag = serializers.SlugRelatedField(
        queryset=KanbanCardTag.objects.all(), slug_field='name', required=False, many=True
    )
    images = serializers.SlugRelatedField(
        queryset=KanbanCardImage.objects.all(), slug_field='image', required=False, many=True
    )

    class Meta:
        model = KanbanCard
        fields = ["id", "title", "text", "tag", "position", "images"]
        read_only_fields = ["id"]


class KanbanColumnSerializer(serializers.ModelSerializer):
    board = serializers.SlugRelatedField(
        queryset=KanbanBoard.objects.all(), slug_field='id', required=True
    )

    class Meta:
        model = KanbanColumn
        fields = ["id", "name", "board"]
        read_only_fields = ["id"]


class KanbanColumnDetailSerializer(serializers.ModelSerializer):
    cards = KanbanCardDetailSerializer(
        many=True, required=False
    )

    class Meta:
        model = KanbanColumn
        fields = ["id", "name", "cards"]
        read_only_fields = ["id"]


class KanbanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanType
        fields = ["id", "name"]
        read_only_fields = ["id"]


class KanbanBoardSerializer(serializers.ModelSerializer):
    type = serializers.SlugRelatedField(
        queryset=KanbanType.objects.all(), slug_field='name', required=True
    )

    class Meta:
        model = KanbanBoard
        fields = ["id", "name", "type"]
        read_only_fields = ["id"]


class KanbanBoardDetailSerializer(serializers.ModelSerializer):
    type = serializers.SlugRelatedField(
        queryset=KanbanType.objects.all(), slug_field='name', required=True
    )
    columns = KanbanColumnDetailSerializer(
        many=True, required=False
    )

    class Meta:
        model = KanbanBoard
        fields = ["id", "name", "type", "columns"]
        read_only_fields = ["id"]
