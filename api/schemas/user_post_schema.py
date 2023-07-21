from api.schemas import fields, validate, ma, validates, ValidationError
from api.models.user_post import UserPost
from api.schemas.post_schema import PostSchema

class UserPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserPost
        include_relationships = True
        include_fk = True
        load_instance = True
        
    post = fields.Nested(PostSchema, exclude=("comment",))
    user = fields.Nested("UserSchema", exclude=("user_post",))