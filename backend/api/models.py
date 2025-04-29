from django.db import models


class KanbanType(models.Model):
    name = models.CharField(max_length=256, unique=True)


class KanbanBoard(models.Model):
    name = models.CharField(max_length=256)
    type = models.ForeignKey(KanbanType, on_delete=models.CASCADE)


class KanbanColumn(models.Model):
    name = models.CharField(max_length=256)
    board = models.ForeignKey(KanbanBoard, on_delete=models.CASCADE)


class KanbanCardTag(models.Model):
    name = models.CharField(max_length=256, unique=True)


class KanbanCard(models.Model):
    title = models.CharField(max_length=256)
    text = models.TextField()
    column = models.ForeignKey(KanbanColumn, on_delete=models.CASCADE)
    tag = models.ManyToManyField(KanbanCardTag)


class KanbanCardImage(models.Model):
    image = models.TextField()
    card = models.ForeignKey(KanbanCard, on_delete=models.CASCADE)
