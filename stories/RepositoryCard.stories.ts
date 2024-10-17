import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepositoryCard from "@/app/ui/repository-card";
import { GithubRepo } from "@/app/lib/types";

const meta: Meta<typeof RepositoryCard> = {
  title: "UI/RepositoryCard",
  component: RepositoryCard,
  ags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof RepositoryCard>;

const mockRepo: GithubRepo = {
  id: 123,
  name: "repo test",
  html_url: "https://github.com/nelson/repo",
  stargazers_count: "150",
  description: "Test repository",
};

export const Default: Story = {
  args: {
    repo: mockRepo,
  },
};

export const WithoutDescription: Story = {
  args: {
    repo: {
      ...mockRepo,
      description: "",
    },
  },
};

export const WithFewStars: Story = {
  args: {
    repo: {
      ...mockRepo,
      stargazers_count: "3",
    },
  },
};
