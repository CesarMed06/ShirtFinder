import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renderiza el footer correctamente", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  it("muestra el texto ShirtFinder", () => {
    render(<Footer />);
    expect(screen.getByText(/shirtfinder/i)).toBeInTheDocument();
  });

  it("muestra FAQS, COOKIES y CRÉDITOS", () => {
    render(<Footer />);
    expect(screen.getByText(/faqs/i)).toBeInTheDocument();
    expect(screen.getByText(/cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/cr[eé]ditos/i)).toBeInTheDocument();
  });
});
