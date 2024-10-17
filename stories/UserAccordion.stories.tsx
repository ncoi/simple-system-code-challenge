import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import UserAccordion from "@/app/ui/user-accordion"; // Adjust import based on your project structure
import { GithubUser, GithubRepo } from "@/app/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
    },
  },
});

const mockUser: GithubUser = {
  id: 123,
  login: "nelson",
};

const mockRepos: GithubRepo[] = [
  {
    id: 1,
    name: "repo 1",
    html_url: "https://github.com/nelson/repo-1",
    stargazers_count: "150",
    description: "This is an awesome repository.",
  },
  {
    id: 2,
    name: "repo 2",
    html_url: "https://github.com/nelson/repo-2",
    stargazers_count: "50",
    description: "Another cool repo.",
  },
];

const meta: Meta<typeof UserAccordion> = {
  title: "UI/UserAccordion",
  component: UserAccordion,
  parameters: {
    layout: "centered",
    mockData: [
      {
        url: "https://api.github.com/users/nelson/repos",
        method: "GET",
        status: 200,
        response: {
          data: mockRepos,
        },
      },
    ],
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      queryClient.setQueryData(["githubUserRepos", "nelson"], mockRepos);
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof UserAccordion>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};
