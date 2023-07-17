from schemas import fields, validate, ma, validates, ValidationError
from models.post import Post
from schemas.comment_schema import CommentSchema
from schemas.community_schema import CommunitySchema
from schemas.user_schema import UserSchema

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_relationships = True
        load_instance = True
    
    created_at = fields.DateTime('%Y-%m-%d %H:%M:%S GMT')    
    user = fields.Nested(UserSchema, exclude=("post", "comment", "user_community", "user_post"))
    comment = fields.Nested(CommentSchema, exclude=("post", "user"), many=True, dump_default=[])
    community = fields.Nested(CommunitySchema, exclude=("post",))