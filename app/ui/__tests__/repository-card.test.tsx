import React from "react";
import { render, screen } from "@testing-library/react";
import RepositoryCard from "@/app/ui/repository-card";
import { GithubRepo } from "@/app/lib/types";

describe("RepositoryCard Component", () => {
  const mockRepo: GithubRepo = {
    id: 1,
    name: "repo-test",
    html_url: "https://github.com/repo/test",
    stargazers_count: "150",
    description: "This is the repository description",
  };

  it("Renders repository details correctly", () => {
    render(<RepositoryCard repo={mockRepo} />);

    expect(
      screen.getByRole("heading", { name: /repo-test/i })
    ).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByLabelText(/stars/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is the repository description/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /repo-test/i })).toHaveAttribute(
      "href",
      mockRepo.html_url
    );
  });

  it("Does not render description if it is null", () => {
    const repoWithoutDescription: GithubRepo = {
      ...mockRepo,
      description: null,
    };
    render(<RepositoryCard repo={repoWithoutDescription} />);

    expect(
      screen.queryByText(/This is the repository description/i)
    ).not.toBeInTheDocument();
  });

  it("Renders correctly without stargazer count", () => {
    const repoWithoutStars: GithubRepo = {
      ...mockRepo,
      stargazers_count: "0",
    };
    render(<RepositoryCard repo={repoWithoutStars} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
