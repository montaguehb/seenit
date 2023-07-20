from api.models import db, SerializerMixin, joinedload


class Post(db.Model):
    __tablename__ = "post"

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    title = db.Column(db.VARCHAR, nullable=False)
    body = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    community_id = db.Column(db.Integer, db.ForeignKey("community.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship("User", back_populates="post")
    comment = db.relationship("Comment", back_populates="post")
    community = db.relationship("Community", back_populates="post")


from api.models.user import User
from api.models.comment import Comment
from api.models.community import Community
