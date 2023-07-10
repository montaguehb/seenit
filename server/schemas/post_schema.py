from schemas import fields, validate, ma, validates, ValidationError
from models.post import Post
from schemas.user_schema import UserSchema
from schemas.comment_schema import CommentSchema
from schemas.community_schema import CommunitySchema

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True

    user = fields.Nested("UserSchema", exclude=("post", "comment", "user_community"))
    comment = fields.Nested("CommentSchema", exclude=("post", "user"), many=True)
    Community = fields.Nested("CommunitySchema")
    

post_schema = PostSchema(many=True)
