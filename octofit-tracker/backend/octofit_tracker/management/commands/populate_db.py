from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            User.objects.all().delete()
            Team.objects.all().delete()
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()

            marvel = Team.objects.create(name="Marvel")
            dc = Team.objects.create(name="DC")

            users = [
                User.objects.create(name="Superman", email="superman@dc.com", team="DC"),
                User.objects.create(name="Batman", email="batman@dc.com", team="DC"),
                User.objects.create(name="Wonder Woman", email="wonderwoman@dc.com", team="DC"),
                User.objects.create(name="Iron Man", email="ironman@marvel.com", team="Marvel"),
                User.objects.create(name="Captain America", email="cap@marvel.com", team="Marvel"),
                User.objects.create(name="Black Widow", email="widow@marvel.com", team="Marvel"),
            ]

            Activity.objects.create(user_email="superman@dc.com", activity="Flight", duration=60)
            Activity.objects.create(user_email="ironman@marvel.com", activity="Suit Up", duration=45)

            Leaderboard.objects.create(user_email="superman@dc.com", score=100)
            Leaderboard.objects.create(user_email="ironman@marvel.com", score=95)

            Workout.objects.create(name="Strength Training", suggested_for="DC")
            Workout.objects.create(name="Agility Drills", suggested_for="Marvel")

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
