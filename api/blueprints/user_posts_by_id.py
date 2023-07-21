from api.blueprints import abort, make_response, g, request, Resource, Blueprint
from api.models import db
from api.models.user_post import UserPost
from api.schemas.user_post_schema import UserPostSchema
from sqlalchemy import func

user_post_by_id_bp = Blueprint('usercommunities', __name__, url_prefix='/usercommunities')
user_post_schema = UserPostSchema(exclude=("post", "user"))

class UserPostById(Resource):
    def patch(self, id):
        if user_post := db.session.get(UserPost, id):
            for key, value in request.get_json().items():
                setattr(user_post, key, value)
            db.session.add(user_post)
            db.session.commit()
            return make_response(user_post_schema.dump(user_post), 200)
    
    def delete(self, id):
        if user_post := db.session.get(UserPost, id):
            db.session.delete(user_post)
            db.session.commit()
            return make_response({"message": "succesfully delete"}, 200)