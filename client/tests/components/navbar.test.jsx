import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../src/components/landing/navbar";

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
  
  test("Should render the links and redirect to their routes", () => {
    const links = [{
      text: "Inicio",
      route: "/"
    }, {
      text: "Inicia sesión",
      route: "/login"
    }, {
      text: "Registrarse",
      route: "/register"
    }];
    links.forEach(link => {
      const homeLink = screen.getByText(link.text);
      expect(homeLink).toBeDefined();
      homeLink.click();
      const routeElement = screen.getByText(link.route);
      expect(routeElement).toBeDefined();
    })
  });
})