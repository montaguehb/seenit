from models import db

class Community(db.Model):
    __tablename__ = "community"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR, unique=True)
    subscribers = db.Column(db.Integer)
    
    post = db.relationship("Post", back_populates="community")