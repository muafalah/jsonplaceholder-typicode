export type PostType = {
  id: number | undefined;
  title: string;
  body: string;
  userId: number;
};

export type CommentType = {
  id: number | undefined;
  name: string;
  email: string;
  body: string;
  postId: number;
};

export type AlbumType = {
  id: number;
  title: string;
  useId: number;
};

export type PhotoType = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
