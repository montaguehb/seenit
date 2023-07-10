from schemas import fields, validate, ma, validates, ValidationError
from models.comment import Comment

class CommentSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Comment
        include_relationships = True
        include_fk = True
        load_instance = True

    user = fields.Nested("UserSchema", exclude=("comment", "post", "user_community"))
    post = fields.Nested("PostSchema", exclude=("comment", "user"))
    child_comment = fields.Nested("CommentSchema", exclude=("post",), many=True)