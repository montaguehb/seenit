from api.models import db, SerializerMixin, aliased


class Comment(db.Model):
    __tablename__ = "comment"

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    body = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    parent_comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship("User", back_populates="comment")
    post = db.relationship("Post", back_populates="comment")
    child_comment = db.relationship("Comment")


from api.models.user import User
from api.models.post import Post
