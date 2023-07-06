from models import db, bcrypt, SerializerMixin, hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR, nullable=False, unique=True)
    role = db.Column(db.String)
    _password_digest = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    post = db.relationship("Post", back_populates="user")
    comment = db.relationship("Comment", back_populates="user")
    user_community = db.relationship("UserCommunity", back_populates="user")
    user_post = db.relationship("UserPost", back_populates="user")

    serialize_only = ("id", "username", "role")
    serialize_rules = ("-post.user", "user_community.user", "-user_post.user")

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