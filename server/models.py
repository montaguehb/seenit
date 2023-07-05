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
    
    @hybrid_property
    def password_digest(self):
        return self._password_digest
    
    @password_digest.setter
    def password_digest(self, password):
        password_digest = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_digest = password_digest.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_digest, password.encode("utf-8"))
    
class UserCommunity(db.Model, SerializerMixin):
    __tablename__ = "user_community"

class Community(db.Model, SerializerMixin):
    __tablename__ = "community"

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comment"

class Post(db.Model, SerializerMixin):
    __tablename__ = "user"

class UserPost(db.Model, SerializerMixin):
    __tablename__ = "user_post"