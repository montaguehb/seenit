from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR, nullable=False, unique=True)
    role = db.Column(db.String)
    _password_digest = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    post = db.relationship("Post", back_populates="user")
    user_community = db.relationship("UserCommunity", back_populates="user")
    user_post = db.relationship("UserPost", back_populates="user")

    serialize_only = ("id", "username", "role")
    serialize_rules = ("-post.user", "user_community.user", "user_community.user_post")

    @hybrid_property
    def password_digest(self):
        return self._password_digest

    @password_digest.setter
    def password_digest(self, password):
        password_digest = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_digest = password_digest.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_digest, password.encode("utf-8")
        )


class UserCommunity(db.Model, SerializerMixin):
    __tablename__ = "user_community"

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    community_id = db.Column(db.Integer, db.ForeignKey("community.id"))
    
    user = db.relationship("User", back_populates="user_community")
    community = db.relationship("Community")

    serialize_rules = ("-user.user_community")


class Community(db.Model, SerializerMixin):
    __tablename__ = "community"

    id = db.Column(db.Integer, primary_key=True)
    subscribers = db.Column(db.Integer)

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comment"

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, server_default=0)
    dislikes = db.Column(db.Integer, server_default=0)
    body = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    parent_comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, updated_at=db.func.now())
    
    

class Post(db.Model, SerializerMixin):
    __tablename__ = "user"
    
    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, server_default=0)
    dislikes = db.Column(db.Integer, server_default=0)
    title = db.Column(db.VARCHAR, nullable=False)
    body = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    community_id = db.Column(db.Integer, db.ForeignKey("community.id"))
    parent_comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, updated_at=db.func.now())


class UserPost(db.Model, SerializerMixin):
    __tablename__ = "user_post"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    liked = db.Column(db.String)
    save = db.Column(db.Boolean)