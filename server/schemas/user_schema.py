from schemas import fields, validate, ma, validates, ValidationError
from models.user import User
from models.post import Post
from models.comment import Comment
from models.user_community import UserCommunity
from models.user_post import UserPost
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
        )

    post = fields.Nested(Post, exclude=("user", "comment"), many=True)
    comment = fields.Nested(
        Comment, exclude=("user", "post", "parent_comment"), many=True
    )
    user_community = fields.Nested(UserCommunity, exclude=("user",))
    


user_schema = UserSchema()
