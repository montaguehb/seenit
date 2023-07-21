from api.schemas import fields, validate, ma, validates, ValidationError
from api.models.user_community import UserCommunity
from api.schemas.community_schema import CommunitySchema
class UserCommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserCommunity
        include_relationships = True
        include_fk = True
        load_instance = True
        
    community = fields.Nested(CommunitySchema, exclude=("post",))
    user = fields.Nested("UserSchema", only=("username",))