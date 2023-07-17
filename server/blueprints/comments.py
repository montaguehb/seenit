from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.comment import Comment
from sqlalchemy import func
from schemas.comment_schema import CommentSchema

comments_bp = Blueprint("comments", __name__, url_prefix="/comments")
comment_schema = CommentSchema()

class Comments(Resource):    
    def post(self):
        new_comment = Comment(**request.get_json(), likes=0, dislikes=0)
        db.session.add(new_comment)
        db.session.commit()
        return make_response(comment_schema.dump(new_comment), 201)
