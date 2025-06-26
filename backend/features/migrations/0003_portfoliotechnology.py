from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('features', '0002_featureanalysis_delete_feature'),
    ]

    operations = [
        migrations.CreateModel(
            name='PortfolioTechnology',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=64)),
                ('name', models.CharField(max_length=64)),
                ('description', models.TextField()),
            ],
            options={
                'db_table': 'portfolio_technologies',
                'verbose_name_plural': 'Portfolio Technologies',
            },
        ),
    ] 