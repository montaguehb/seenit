from models import db, SerializerMixin

class Community(db.Model, SerializerMixin):
    __tablename__ = "community"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR)
    subscribers = db.Column(db.Integer)