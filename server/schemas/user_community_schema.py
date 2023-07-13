from schemas import fields, validate, ma, validates, ValidationError
from models.user_community import UserCommunity
from schemas.community_schema import CommunitySchema
class UserCommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserCommunity
        include_relationships = True
        include_fk = True
        load_instance = True
        
    community = fields.Nested(CommunitySchema, exclude=("user_community",))