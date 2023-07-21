import typing
from api.schemas import fields, validate, ma, validates, ValidationError
from api.models.comment import Comment


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        include_relationships = True
        include_fk = True
        load_instance = True

    body = fields.String(
        required=True,
        validate=validate.Length(
            1, 500, error="Comment must be between 1 and 500 characters"
        ),
    )
    
    user = fields.Nested("UserSchema", exclude=("comment", "post", "user_community"))
    post = fields.Nested("PostSchema", exclude=("comment", "user"))
    child_comment = fields.Nested(
        "CommentSchema", exclude=("post",), many=True, dump_default=[]
    )
