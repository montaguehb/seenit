from faker import Faker
from random import randint, choice
from config import app
import models

fake = Faker()


def user():
    models.User.query.delete()
    for _ in range(10):
        user_profile = fake.profile()
        new_user = models.User(
            username=user_profile["username"], role="user", password_digest="password"
        )
        models.db.session.add(new_user)
    models.db.session.commit()


def community():
    communities = ["pics", "dogs", "cats", "programming", "syrups"]
    models.Community.query.delete()
    for _ in range(5):
        new_community = models.Community(
            name=communities.pop(randint(0, len(communities)-1)), subscribers=0
        )
        models.db.session.add(new_community)
    models.db.session.commit()


def user_community():
    users = models.User.query.count()
    communities = models.Community.query.count()

    models.UserCommunity.query.delete()

    for _ in range(100):
        rand_community=randint(1, communities-1)
        new_user_community = models.UserCommunity(
            role="user", user_id=randint(0, users), community_id=rand_community
        )
        updated_community = models.db.session.get(models.Community, rand_community)
        updated_community.subscribers = updated_community.subscribers + 1
        models.db.session.add(new_user_community, updated_community)
        
    models.db.session.commit()

def post():
    models.Post.query.delete()
    for _ in range(100):
        users = models.User.query.count()
        communities = models.Community.query.count()

        new_post = models.Post(
            likes=randint(1, 1000),
            dislikes=randint(0, 100),
            title=fake.sentence(nb_words=5),
            body=fake.paragraph(nb_sentences=5),
            user_id=randint(0, users),
            community_id=randint(0, communities)
        )
        models.db.session.add(new_post)
    models.db.session.commit()
    
def comment():
    models.Comment.query.delete()
    users = models.User.query.count()
    
    for _ in range(1000):
        post = choice(models.Post.query.all())
        comments=models.Comment.query.filter_by(post_id=post.id).all()
        comment_id=[comment.id for comment in comments] if comments else []
        comment_id.append(0)
        parent_comment=choice(comment_id)
        new_comment = models.Comment(
            likes=randint(1, 1000),
            dislikes=randint(0, 100),
            body=fake.paragraph(nb_sentences=5),
            user_id=randint(0, users),
            post_id=post.id,
            parent_comment_id=parent_comment
        )
        models.db.session.add(new_comment)
    models.db.session.commit()
    
if __name__ == ("__main__"):
    with app.app_context():
        user()
        community()
        user_community()
        post()
        comment()
