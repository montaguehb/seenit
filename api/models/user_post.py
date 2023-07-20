from api.models import db, SerializerMixin

class UserPost(db.Model):
    __tablename__ = "user_post"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    liked = db.Column(db.Integer)
    saved = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="user_post")
    post = db.relationship("Post")
    
from api.models.user import User
from api.models.post import Post