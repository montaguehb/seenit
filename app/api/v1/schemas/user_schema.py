import typing
from schemas import fields, validate, ma, validates, ValidationError
from models.user import User
from schemas.comment_schema import CommentSchema
from schemas.user_community_schema import UserCommunitySchema
import re


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
        include_fk = True
    
    
    post = fields.Nested("PostSchema", exclude=("user", "comment",), many=True, dump_default=[])
    comment = fields.Nested(
        CommentSchema, exclude=("user", "post", "child_comment"), many=True
    )
    user_post = fields.Nested("UserPostSchema", exclude=("user",), many=True, dump_default=[])
    user_community = fields.Nested(UserCommunitySchema, exclude=("user",), many=True, dump_default=[])

