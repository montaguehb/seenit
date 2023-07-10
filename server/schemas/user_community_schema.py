from schemas import fields, validate, ma, validates, ValidationError
from models.user_community import UserCommunity

class UserCommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserCommunity
        load_instance = True