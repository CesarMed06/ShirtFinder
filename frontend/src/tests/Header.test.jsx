import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  it("renderiza el logo de ShirtFinder", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(container.querySelector("img, svg")).toBeTruthy();
  });

  it("muestra los enlaces HOME, CATÁLOGO, FORO y MI CUENTA", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cat[aá]logo/i)).toBeInTheDocument();
    expect(screen.getByText(/foro/i)).toBeInTheDocument();
    expect(screen.getByText(/mi cuenta/i)).toBeInTheDocument();
  });

  it("muestra el buscador", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("el buscador tiene el placeholder correcto", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(
      screen.getByPlaceholderText(/buscar camisetas/i),
    ).toBeInTheDocument();
  });
});
