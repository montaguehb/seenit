from models import db, SerializerMixin

class UserPost(db.Model):
    __tablename__ = "user_post"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    liked = db.Column(db.String)
    save = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="user_post")
    post = db.relationship("Post")
    # serialize_rules=("-user.user_post")
    
from models.user import User
from models.post import Post