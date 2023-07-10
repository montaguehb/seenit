from schemas import fields, validate, ma, validates, ValidationError
from models.user_community import UserCommunity

class UserCommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserCommunity
        include_relationships = True
        include_fk = True
        load_instance = True