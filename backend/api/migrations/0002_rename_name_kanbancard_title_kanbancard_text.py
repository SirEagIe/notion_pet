# Generated by Django 5.2 on 2025-04-28 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='kanbancard',
            old_name='name',
            new_name='title',
        ),
        migrations.AddField(
            model_name='kanbancard',
            name='text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
