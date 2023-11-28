import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../../src/components/landing/navbar";

describe("Render Navbar with its props", async () => {
  beforeEach(() => {
    render(
      <Navbar />,
      { wrapper: MemoryRouter }
    );
  })

  test("Should render the logo", () => {
    const logoElement = screen.getByAltText("psicotest-logo");
    expect(logoElement).toBeDefined();
  });
  
  test("Should render the links", () => {
    const links = ["Inicio", "Inicia sesión", "Registrarse"];
    links.forEach(link => {
      const homeLink = screen.getByText(link);
      expect(homeLink).toBeDefined();
    })
  });

  test("Click Inicio should redirect to their route", () => {
    act(() => {
      const homeLink = screen.getByText("Inicio");
      homeLink.click();
    });
    expect(window.location.pathname).toBe("/");
  });
});