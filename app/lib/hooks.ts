import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GithubUser, GithubRepo } from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;

async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Error ${res.status}: ${res.statusText} - while fetching ${url}`
    );
  }

  return res.json();
}

export function useGithubUsers(
  username: string,
  pageSize = 5
): UseQueryResult<GithubUser[], Error> {
  return useQuery({
    queryKey: ["githubUsers", username],
    queryFn: async () => {
      const data = await fetcher(
        `${API_URL}/search/users?q=${username}&per_page=${pageSize}`
      );

      return data.items;
    },
    enabled: false,
  });
}

export function useGithubRepos(
  username: string
): UseQueryResult<GithubRepo[], Error> {
  return useQuery({
    queryKey: ["githubUserRepos", username],
    queryFn: () => fetcher(`${API_URL}/users/${username}/repos`),
    enabled: false,
  });
}
