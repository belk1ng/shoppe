import { fireEvent, render, screen } from "@testing-library/react";
import { fn } from "@vitest/spy";
import { Button } from "./Button";

describe("Button component", () => {
  it("should render the button with default props", () => {
    render(<Button variant="contained-black">Click me</Button>);

    const button = screen.getByText("Click me");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("should render the button with the 'contained-black' variant", () => {
    render(<Button variant="contained-black">Contained Black button</Button>);

    const button = screen.getByText("Contained Black button");

    expect(button).toHaveClass("button--containedBlack");
  });

  it("should render the button with the 'outlined-black' variant", () => {
    render(<Button variant="outlined-black">Outlined Black button</Button>);

    const button = screen.getByText("Outlined Black button");

    expect(button).toHaveClass("button--outlinedBlack");
  });

  it("should render the button with the 'outlined-white' variant", () => {
    render(<Button variant="outlined-white">Outlined White button</Button>);

    const button = screen.getByText("Outlined White button");

    expect(button).toHaveClass("button--outlinedWhite");
  });

  it("should render the button with fullWidth prop", () => {
    render(
      <Button fullWidth variant="outlined-white">
        Fullwidth button
      </Button>
    );

    const button = screen.getByText("Fullwidth button");

    expect(button).toHaveClass("button--fullwidth");
  });

  it("should apply custom className", () => {
    render(
      <Button className="custom-class" variant="contained-black">
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");

    expect(button).toHaveClass("custom-class");
  });

  it("should call onClick handler", () => {
    const callback = fn();
    render(
      <Button
        className="custom-class"
        onClick={callback}
        variant="contained-black"
      >
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick handler when disabled", () => {
    const callback = fn();
    render(
      <Button
        className="custom-class"
        disabled
        onClick={callback}
        variant="contained-black"
      >
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
