from models import db, bcrypt, SerializerMixin, hybrid_property


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    role = db.Column(db.String)
    _password_digest = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    post = db.relationship("Post", back_populates="user", cascade="all, delete")
    comment = db.relationship("Comment", back_populates="user", cascade="all, delete")
    user_community = db.relationship("UserCommunity", back_populates="user", cascade="all, delete")
    user_post = db.relationship("UserPost", back_populates="user", cascade="all, delete")

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


from models.post import Post
from models.comment import Comment
from models.user_community import UserCommunity
from models.user_post import UserPost
