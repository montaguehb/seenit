export type CommentType = {
  id: number;
  body: string;
  child_comment?: Array<CommentType>;
  created_at: string;
  dislikes: number;
};

export type CommunityType = {
  id: number;
  name: string;
  subscribers?: number;
};

export interface PostProps {
  id: number;
  likes: number;
  dislikes: number;
  title: string;
  community: CommunityType;
}

export type UserContextType = {
  user: any | null;
  updateUser: any;
}

export interface ValuesInterface {
  username: string;
  email: string;
  password: string;
}