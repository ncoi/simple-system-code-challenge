import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserAccordion from "@/app/ui/user-accordion";
import { useGithubRepos } from "@/app/lib/hooks";
import { GithubUser, GithubRepo } from "@/app/lib/types";

jest.mock("@/app/lib/hooks", () => ({
  useGithubRepos: jest.fn(),
}));

const mockedUseGithubRepos = useGithubRepos as jest.MockedFunction<
  typeof useGithubRepos
>;

const refetchMock = jest.fn();

describe("UserAccordion Component", () => {
  const mockUser: GithubUser = {
    id: 1,
    login: "test-user",
  };

  const mockRepos: GithubRepo[] = [
    {
      id: 101,
      name: "repo-one",
      html_url: "https://github.com/test-user/repo-one",
      stargazers_count: "50",
      description: "First repository",
    },
    {
      id: 102,
      name: "repo-two",
      html_url: "https://github.com/test-user/repo-two",
      stargazers_count: "75",
      description: "Second repository",
    },
  ];

  beforeEach(() => {
    mockedUseGithubRepos.mockReturnValue({
      isLoading: false,
      data: mockRepos,
      error: null,
      refetch: refetchMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders user login in accordion summary", () => {
    render(<UserAccordion user={mockUser} />);
    expect(screen.getByText(/test-user/i)).toBeInTheDocument();
  });

  it("Fetches and displays repositories on accordion expand", async () => {
    render(<UserAccordion user={mockUser} />);

    const accordionSummary = screen.getByTestId(
      `accordion-summary-${mockUser.id}`
    );

    expect(accordionSummary).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(accordionSummary);

    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled();
      expect(accordionSummary).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText(/repo-one/i)).toBeInTheDocument();
      expect(screen.getByText(/repo-two/i)).toBeInTheDocument();
    });
  });

  it("Displays error alert when there is an error", () => {
    mockedUseGithubRepos.mockReturnValue({
      isLoading: false,
      data: [],
      error: { message: "Failed to fetch repositories." },
      refetch: jest.fn(),
    });

    render(<UserAccordion user={mockUser} />);

    expect(
      screen.getByText(/Failed to fetch repositories\./i)
    ).toBeInTheDocument();
  });

  it("Displays info alert when no repositories are found", () => {
    mockedUseGithubRepos.mockReturnValueOnce({
      isLoading: false,
      data: [],
      error: null,
      refetch: jest.fn(),
    });

    render(<UserAccordion user={mockUser} />);

    expect(screen.getByText(/No repositories found\./i)).toBeInTheDocument();
  });
});
