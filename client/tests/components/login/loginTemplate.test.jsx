import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LoginTemplate from "../../../src/components/login/loginTemplate";
import TestContexts from "../../../src/wrappers/testContexts";

describe("Should render LoginTemplate with its props", () => {
  test("Title text should be passed in prop", () => {
    const title = "Registro"
    render(
      <TestContexts>
        <LoginTemplate 
          title={title}
        />
      </TestContexts>
    )
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeDefined();
  });

  test("Should render the children", () => {
    const text = "I'm a children"
    render(
      <TestContexts>
        <LoginTemplate>
          <p>{text}</p>
        </LoginTemplate>
      </TestContexts>
    )
    const titleElement = screen.getByText(text);
    expect(titleElement).toBeDefined();
  });

  test("Should render elements by options", () => {
    render(
      <TestContexts>
        <LoginTemplate toLogin />
      </TestContexts>
    )
    const titleElement = screen.getByText("¿Ya tienes una cuenta?");
    expect(titleElement).toBeDefined();
  });
});