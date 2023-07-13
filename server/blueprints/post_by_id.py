from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db, joinedload, aliased
from config import select
from models.post import Post
from models.comment import Comment
from schemas.post_schema import PostSchema
from schemas.comment_schema import CommentSchema

post_by_id_bp = Blueprint(
    "post_by_id",
    __name__,
    url_prefix="/communities/<int:community_id>/posts/<int:post_id>",
)

post_schema = PostSchema()
comment_schema = CommentSchema()
comment_alias = aliased(Comment)


class PostById(Resource):
    # do you think that god stays in heaven out of fear?
    def get(self, community_id, post_id):
        if (
            result := db.session.execute(
                db.select(Post, Comment)
                .distinct()
                .where(Post.id == post_id)
                .join(Post.comment.of_type(Comment))
                .join(Comment.child_comment.of_type(comment_alias), isouter=True)
                .where(Comment.parent_comment_id == 0)
            )
            .merge()
            .all()
        ):
            post = post_schema.dump(result[0][0])
            post["comment"] = []
            for comment in result:
                post["comment"].append(comment_schema.dump(comment[1]))
            return make_response(post, 200)
        else:
            return make_response({"error": "post not found"}, 404)
