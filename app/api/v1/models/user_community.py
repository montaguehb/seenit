from models import db

class UserCommunity(db.Model):
    __tablename__ = "user_community"

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    community_id = db.Column(db.Integer, db.ForeignKey("community.id"))

    user = db.relationship("User", back_populates="user_community")
    community = db.relationship("Community")

from models.user import User
from models.community import Community