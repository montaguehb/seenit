from schemas import fields, validate, ma, validates, ValidationError
from models.user import User
from schemas.comment_schema import CommentSchema
from schemas.user_community_schema import UserCommunitySchema
import re


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        fields = (
            "id",
            "username",
            "role",
            "created_at",
            "comment",
            "user_community",
            "user_post",
            "post"
        )

    post = fields.Nested("PostSchema", exclude=("user", "comment",), many=True)
    comment = fields.Nested(
        CommentSchema, exclude=("user", "post", "parent_comment"), many=True
    )
    user_community = fields.Nested(UserCommunitySchema, exclude=("user",), many=True)

