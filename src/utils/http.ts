import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;
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

// Fetch Users
export const fetchUsers = async ({ signal }: { signal: AbortSignal }) => {
  const response = await fetch(USER_URL, { signal: signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the users");
  }

  return response.json();
};
