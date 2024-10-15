export type GithubUser = {
  id: number;
  login: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: string;
  html_url: string;
};
