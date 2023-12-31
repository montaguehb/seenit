from api.schemas import fields, validate, ma, validates, ValidationError
from api.models.post import Post
from api.schemas.comment_schema import CommentSchema
from api.schemas.community_schema import CommunitySchema
from api.schemas.user_schema import UserSchema

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_fk = True
        include_relationships = True
        load_instance = True
        
    title = fields.String(
        required=True,
        validate=validate.Length(
            1, 50, error="Title must be between 1 and 50 characters"
        ),
    )
        
    body = fields.String(
        required=True,
        validate=validate.Length(
            1, 500, error="Body must be between 1 and 500 characters"
        ),
    )
    created_at = fields.DateTime('%Y-%m-%d %H:%M:%S')    
    user = fields.Nested(UserSchema, exclude=("post", "comment", "user_community", "user_post"))
    comment = fields.Nested(CommentSchema, exclude=("post", "user"), many=True, dump_default=[])
    community = fields.Nested(CommunitySchema, exclude=("post",))