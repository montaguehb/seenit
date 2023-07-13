interface Comment {
  id: number;
  body: string;
  child_comment?: Comment;
  created_at: string;
  dislikes: number;
}

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;
