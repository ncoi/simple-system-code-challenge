import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SearchForm from "@/app/ui/search-form";

const meta = {
  title: "UI/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "centered",
  },
  ags: ["autodocs"],
  args: {
    setUsername: fn(),
    handleSubmit: fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      fn()(event);
    }),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "",
    validationError: false,
  },
};

export const WithUsername: Story = {
  args: {
    username: "nelson",
    validationError: false,
  },
};

export const WithError: Story = {
  args: {
    username: "",
    validationError: true,
  },
};
