from api.config import app, db, flask_api, jwt
from api.models.user import User
from api.blueprints import IntegrityError
from api.blueprints.users import Users
from api.blueprints.user_by_id import UserById
from api.blueprints.posts import Posts
from api.blueprints.posts_by_communities import PostsByCommunityId
from api.blueprints.post_by_id import PostById
from api.blueprints.user_communities import UserCommunities
from api.blueprints.user_communities_by_id import UserCommunitiesById
from api.blueprints.user_posts import UserPosts
from api.blueprints.user_posts_by_id import UserPostById
from api.blueprints.communities import Communities
from api.blueprints.comments import Comments
from api.schemas.user_schema import UserSchema

from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies,
    unset_refresh_cookies
)