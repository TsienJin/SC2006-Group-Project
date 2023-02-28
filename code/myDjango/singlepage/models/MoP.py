from django.db import models

class MoP(models.Model):
    sessionID = models.CharField(max_length=255, null = True, default = 'null')

    def __str__(self):
        return f'{self.sessionID}'