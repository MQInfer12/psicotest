import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TestContexts from "../../../src/wrappers/testContexts";
import UserCard from "../../../src/components/user/userCard";

describe("Should render UserCard with its props", () => {
  const user = {
    id: 1,
    estado: true,
    nombre_user: "Mauricio Molina",
    nombre_rol: "Admin",
    email: "maummq@gmail.com",
    genero: "Hombre",
    nombre_sede: "Cochabamba",
    edad: 21,
    id_rol: 1
  };

  test("Should render all User data", () => {
    render(
      <TestContexts>
        <UserCard {...user} />
      </TestContexts>
    );
    const nombreText = screen.getByText(user.nombre_user);
    expect(nombreText).toBeDefined();
    const estadoText = screen.getByText(user.estado ? "Habilitado" : "Deshabilitado");
    expect(estadoText).toBeDefined();
    const rolText = screen.getByText(user.nombre_rol);
    expect(rolText).toBeDefined();
    const emailText = screen.getByText(user.email);
    expect(emailText).toBeDefined();
    const generoText = screen.getByText(user.genero);
    expect(generoText).toBeDefined();
    const sedeText = screen.getByText(user.nombre_sede);
    expect(sedeText).toBeDefined();
    const edadText = screen.getByText(user.edad + " años");
    expect(edadText).toBeDefined();
  });

  test("Should disable the buttons if its admin", () => {
    render(
      <TestContexts>
        <UserCard 
          id_rol={3}
          estado={true} 
        />
      </TestContexts>
    );
    const buttonTitles = ["Editar usuario", "Deshabilitar usuario", "Eliminar usuario"];
    buttonTitles.forEach(title => {
      const editarButton = screen.getByTitle(title);
      expect(editarButton).toHaveProperty("disabled", true);
    })
  });
});