# Generated by Django 5.2 on 2025-04-29 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_kanbancard_tags_kanbancard_tag_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='kanbancard',
            name='position',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
