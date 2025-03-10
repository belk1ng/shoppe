import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";
import { Input } from "./Input";

describe("Input component", () => {
  it("should render the input with default props", () => {
    render(<Input label="Test Label" />);

    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test Label");

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render the input with a custom id", () => {
    render(<Input id="custom-id" label="Test Label" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("should render the input with a start icon", () => {
    const startIcon = <span data-testid="start-icon">Icon</span>;
    render(<Input label="Test Label" startIcon={startIcon} />);

    const icon = screen.getByTestId("start-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render the input with an end icon", () => {
    const endIcon = <span data-testid="end-icon">Icon</span>;
    render(<Input endIcon={endIcon} label="Test Label" />);

    const icon = screen.getByTestId("end-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Input className="custom-class" label="Test Label" />);

    const inputWrapper = screen.getByRole("textbox").parentElement;
    expect(inputWrapper).toHaveClass("custom-class");
  });

  it("should call onChange handler", () => {
    const onChange = vitest.fn();
    render(<Input label="Test Label" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should not call onChange handler when disabled", () => {
    const onChange = vitest.fn();
    render(<Input disabled label="Test Label" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("should render the input with a placeholder", () => {
    render(<Input label="Test Label" placeholder="Enter text" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("should render the input with a value", () => {
    render(<Input label="Test Label" readOnly value="Test Value" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Test Value");
  });

  it("should render the input as disabled", () => {
    render(<Input disabled label="Test Label" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
