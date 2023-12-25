import { QueryClient } from "@tanstack/react-query";
import { CommentType, PostType } from "./type";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;
const COMMENT_URL = `${import.meta.env.VITE_API_URL}/comments`;
const ALBUM_URL = `${import.meta.env.VITE_API_URL}/albums`;
const USER_URL = `${import.meta.env.VITE_API_URL}/users`;

// Fetch Posts
export const fetchPosts = async ({
  signal,
  userId,
  title,
}: {
  signal: AbortSignal;
  userId?: number | undefined;
  title?: string | undefined;
}) => {
  let newUrl = POST_URL;

  if (userId) {
    newUrl = `${POST_URL}/?userId=${userId}`;
  }

  if (title) {
    newUrl = `${POST_URL}/?title=${title}`;
  }

  const response = await fetch(newUrl, { signal: signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the posts");
  }

  return response.json();
};

// Fetch Post By Id
export const fetchPostById = async ({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string | undefined;
}) => {
  if (!id) return null;

  const response = await fetch(`${POST_URL}/${id}`, { signal: signal });

  if (!response.ok) {
    throw new Error(`An error occurred while fetching the post with id: ${id}`);
  }

  return response.json();
};

// Create New Post
export const createNewPost = async (body: PostType) => {
  const response = await fetch(POST_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating the post");
  }

  return response.json();
};

// Edit Post by Id
export const updatePostById = async (body: PostType) => {
  const response = await fetch(`${POST_URL}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: body.title,
      body: body.body,
      userId: body.userId,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `An error occurred while updating the post with id: ${body.id}`
    );
  }

  return response.json();
};

// Delete Post By Id
export const deletePostById = async (id: number) => {
  const response = await fetch(`${POST_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`An error occurred while updating the post with id: ${id}`);
  }

  return response.json();
};

// Fetch Comments By Post Id
export const fetchCommentsByPostId = async ({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string | undefined;
}) => {
  if (!id) return null;

  const response = await fetch(`${POST_URL}/${id}/comments`, {
    signal: signal,
  });

  if (!response.ok) {
    throw new Error(
      `An error occurred while fetching the comments with id: ${id}`
    );
  }

  return response.json();
};

// Create New Comment
export const createNewComment = async (body: CommentType) => {
  const response = await fetch(COMMENT_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating the comment");
  }

  return response.json();
};

// Edit Comment By Id
export const updateCommentById = async (body: CommentType) => {
  const response = await fetch(`${COMMENT_URL}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      body: body.body,
      postId: body.postId,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `An error occurred while updating the comment with id: ${body.id}`
    );
  }

  return response.json();
};

// Delete Comment By Id
export const deleteCommentById = async (id: number | undefined) => {
  const response = await fetch(`${COMMENT_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`An error occurred while updating the post with id: ${id}`);
  }

  return response.json();
};

// Fetch Albums
export const fetchAlbums = async ({
  signal,
  userId,
}: {
  signal: AbortSignal;
  userId?: number | undefined;
}) => {
  let newUrl = ALBUM_URL;

  if (userId) {
    newUrl = `${ALBUM_URL}/?userId=${userId}`;
  }

  const response = await fetch(newUrl, { signal: signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the albums");
  }

  return response.json();
};

// Fetch Photos By Album Id
export const fetchPhotosByAlbumId = async ({
  signal,
  albumId,
}: {
  signal: AbortSignal;
  albumId: string | undefined;
}) => {
  if (!albumId) return null;

  const response = await fetch(`${ALBUM_URL}/${albumId}/photos`, {
    signal: signal,
  });

  if (!response.ok) {
    throw new Error(
      `An error occurred while fetching the photos with id:${albumId}`
    );
  }

  return response.json();
};

// Fetch Users
export const fetchUsers = async ({ signal }: { signal: AbortSignal }) => {
  const response = await fetch(USER_URL, { signal: signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the users");
  }

  return response.json();
};
