from api.blueprints import abort, make_response, g, request, Resource, Blueprint
from api.models import db
from api.models.comment import Comment
from sqlalchemy import func
from api.schemas.comment_schema import CommentSchema

comments_bp = Blueprint("comments", __name__, url_prefix="/comments")
comment_schema = CommentSchema()

class Comments(Resource):    
    def post(self):
        try:
            new_comment = comment_schema.load({**request.get_json(), "likes":0, "dislikes": 0})
            db.session.add(new_comment)
            db.session.commit()
            return make_response(comment_schema.dump(new_comment), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)