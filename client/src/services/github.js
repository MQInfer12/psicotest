import { githubAuthorization } from "../env";

export const getCommits = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/JosseMontano/psychology-laravel-react/commits",
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: githubAuthorization,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
