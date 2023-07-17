from schemas import fields, validate, ma, validates, ValidationError
from models.user_post import UserPost
from schemas.post_schema import PostSchema

class UserPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserPost
        include_relationships = True
        include_fk = True
        load_instance = True
        
    post = fields.Nested(PostSchema)
    user = fields.Nested("UserSchema", only=("username",))