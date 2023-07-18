from blueprints import abort, make_response, g, request, Resource, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from schemas.user_schema import UserSchema
from models.user import User

user_by_id_bp = Blueprint('users', __name__, url_prefix='/users/<int:id>')
user_schema = UserSchema()
class UserById(Resource):
    
    def get(self, id):
        if user := db.session.get(User, id):
            return make_response(user_schema.dump(user), 200)
        else:
            return make_response({"error": "user not found"}, 404)
    
    @jwt_required()
    def patch(self, id):
        if id == get_jwt_identity():
            user = db.session.get(User, id)
            user.email = request.get_json()["email"]
            db.session.add(user)
            db.session.commit()
            return make_response(user_schema.dump(user), 200)
    
    @jwt_required()
    def delete(self, id):
        if id == get_jwt_identity():
            user = db.session.get(User, id)
            user.email = request.get_json()["email"]
            db.session.add(user)
            db.session.commit()
            return make_response(user_schema.load(user), 200)