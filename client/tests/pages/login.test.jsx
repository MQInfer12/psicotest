import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Login from "../../src/pages/login";
import TestContexts from "../../src/wrappers/testContexts";

describe("Should render the Login page", () => {
  beforeEach(() => {
    render(
      <TestContexts>
        <Login />
      </TestContexts>
    )
  });

  test("Should have the title Login", () => {
    const titleElement = screen.getByText("Login");
    expect(titleElement).toBeDefined();
  });
});