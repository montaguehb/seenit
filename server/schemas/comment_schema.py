from schemas import fields, validate, ma, validates, ValidationError
from models.comment import Comment
# from schemas.user_schema import UserSchema
# from schemas.post_schema import PostSchema

class CommentSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Comment
        load_instance = True

    user = fields.Nested("UserSchema", exclude=("comment", "post", "user_community"))
    post = fields.Nested("PostSchema", exclude=("comment", "user"))