from faker import Faker
from random import randint, choice
from config import app
from models import db
from models.user import User
from models.community import Community
from models.post import Post
from models.comment import Comment
from models.user_community import UserCommunity
from models.user_post import UserPost

fake = Faker()


def user():
    User.query.delete()
    for _ in range(10):
        user_profile = fake.profile()
        new_user = User(
            username=user_profile["username"], role="user", password_digest="password"
        )
        db.session.add(new_user)
    db.session.commit()


def community():
    communities = ["pics", "dogs", "cats", "programming", "syrups"]
    Community.query.delete()
    for _ in range(5):
        new_community = Community(
            name=communities.pop(randint(0, len(communities)-1)), subscribers=0
        )
        db.session.add(new_community)
    db.session.commit()


def user_community():
    users = User.query.count()
    communities = Community.query.count()

    UserCommunity.query.delete()

    for _ in range(100):
        rand_community=randint(1, communities-1)
        new_user_community = UserCommunity(
            role="user", user_id=randint(0, users), community_id=rand_community
        )
        updated_community = db.session.get(Community, rand_community)
        updated_community.subscribers = updated_community.subscribers + 1
        db.session.add(new_user_community, updated_community)
        
    db.session.commit()

def post():
    Post.query.delete()
    for _ in range(100):
        users = User.query.count()
        communities = Community.query.count()

        new_post = Post(
            likes=randint(1, 1000),
            dislikes=randint(0, 100),
            title=fake.sentence(nb_words=5),
            body=fake.paragraph(nb_sentences=5),
            user_id=randint(0, users),
            community_id=randint(0, communities)
        )
        db.session.add(new_post)
    db.session.commit()
    
def comment():
    Comment.query.delete()
    users = User.query.count()
    
    for _ in range(1000):
        post = choice(Post.query.all())
        comments=Comment.query.filter_by(post_id=post.id).all()
        comment_id=[comment.id for comment in comments] if comments else []
        comment_id.append(0)
        parent_comment=choice(comment_id)
        new_comment = Comment(
            likes=randint(1, 1000),
            dislikes=randint(0, 100),
            body=fake.paragraph(nb_sentences=5),
            user_id=randint(0, users),
            post_id=post.id,
            parent_comment_id=parent_comment
        )
        db.session.add(new_comment)
    db.session.commit()
    
if __name__ == ("__main__"):
    with app.app_context():
        user()
        community()
        user_community()
        post()
        comment()