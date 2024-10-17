import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "@/app/page";
import { useGithubUsers, useGithubRepos } from "@/app/lib/hooks";
import { GithubUser } from "@/app/lib/types";

jest.mock("@/app/lib/hooks", () => ({
  useGithubUsers: jest.fn(),
  useGithubRepos: jest.fn(),
}));

const mockedUseGithubUsers = useGithubUsers as jest.MockedFunction<
  typeof useGithubUsers
>;

const mockedUseGithubRepos = useGithubRepos as jest.MockedFunction<
  typeof useGithubRepos
>;

describe("Dashboard Component", () => {
  const mockUsers: GithubUser[] = [
    { id: 1, login: "nelson-user-1" },
    { id: 2, login: "nelson-user-2" },
  ];

  beforeEach(() => {
    mockedUseGithubUsers.mockReturnValue({
      isLoading: false,
      data: mockUsers,
      error: null,
      refetch: jest.fn(),
    });

    mockedUseGithubRepos.mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Calls refetch and displays users on valid search", async () => {
    const refetchMock = jest.fn();
    mockedUseGithubUsers.mockReturnValue({
      isLoading: false,
      data: mockUsers,
      error: null,
      refetch: refetchMock,
    });

    render(<Dashboard />);
    fireEvent.change(screen.getByLabelText(/enter username/i), {
      target: { value: "nelson" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled();
      expect(
        screen.getByText(/showing users for "nelson"/i)
      ).toBeInTheDocument();
      expect(screen.getByText("nelson-user-1")).toBeInTheDocument();
      expect(screen.getByText("nelson-user-2")).toBeInTheDocument();
    });
  });

  it("Displays error alert when there is an error", () => {
    mockedUseGithubUsers.mockReturnValue({
      isLoading: false,
      data: [],
      error: { message: "API Error" },
      refetch: jest.fn(),
    });

    render(<Dashboard />);
    fireEvent.change(screen.getByLabelText(/enter username/i), {
      target: { value: "invalid-user" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      screen.getByText(/Something went wrong. Please try again later\./i)
    ).toBeInTheDocument();
  });
});
