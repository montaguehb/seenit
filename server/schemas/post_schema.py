from schemas import fields, validate, ma, validates, ValidationError
from models.post import Post
from models.user import User
from models.comment import Comment
from models.community import Community
import re

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        include_relationships = True
        load_instance = True
    