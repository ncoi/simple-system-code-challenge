import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "@/app/ui/search-form";

describe("SearchForm Component", () => {
  const SearchFormTest = ({ validationError = false }) => {
    const [username, setUsername] = useState("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };
    return (
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmit}
        validationError={validationError}
      />
    );
  };

  it("Renders search input and button", () => {
    render(<SearchFormTest />);
    expect(screen.getByLabelText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("Displays validation error when empty input and validationError true", () => {
    render(<SearchFormTest validationError={true} />);
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });

  it("Clears search term when X is clicked", async () => {
    render(<SearchFormTest />);
    const searchInput = screen.getByLabelText(
      /enter username/i
    ) as HTMLInputElement;
    fireEvent.change(searchInput, {
      target: { value: "nelson" },
    });

    await waitFor(() => {
      expect(searchInput.value).toBe("nelson");
    });

    fireEvent.click(screen.getByTestId(/clearBtn/i));

    await waitFor(() => {
      const searchElement = screen.getByLabelText(
        /enter username/i
      ) as HTMLInputElement;
      expect(searchElement.value).toBe("");
    });
  });
});
