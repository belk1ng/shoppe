import { render, screen, fireEvent } from "@testing-library/react";
import { fn } from "@vitest/spy";
import { Counter } from "./Counter";

describe("Counter component", () => {
  it("should render with the default value", () => {
    render(<Counter />);
    const value = screen.getByText("0");
    expect(value).toBeInTheDocument();
  });

  it("should render with a custom default value", () => {
    render(<Counter defaultValue={5} />);
    const value = screen.getByText("5");
    expect(value).toBeInTheDocument();
  });

  it("should increment the value when the increment button is clicked", () => {
    render(<Counter />);
    const incrementButton = screen.getByLabelText("Увеличить количество");
    fireEvent.click(incrementButton);
    const value = screen.getByText("1");
    expect(value).toBeInTheDocument();
  });

  it("should decrement the value when the decrement button is clicked", () => {
    render(<Counter defaultValue={5} />);
    const decrementButton = screen.getByLabelText("Уменьшить количество");
    fireEvent.click(decrementButton);
    const value = screen.getByText("4");
    expect(value).toBeInTheDocument();
  });

  it("should call onChange when the value changes", () => {
    const onChange = fn();
    render(<Counter onChange={onChange} />);
    const incrementButton = screen.getByLabelText("Увеличить количество");
    fireEvent.click(incrementButton);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("should not decrement below the min value", () => {
    render(<Counter defaultValue={0} min={0} />);
    const decrementButton = screen.getByLabelText("Уменьшить количество");
    fireEvent.click(decrementButton);
    const value = screen.getByText("0");
    expect(value).toBeInTheDocument();
  });

  it("should not increment above the max value", () => {
    render(<Counter defaultValue={10} max={10} />);
    const incrementButton = screen.getByLabelText("Увеличить количество");
    fireEvent.click(incrementButton);
    const value = screen.getByText("10");
    expect(value).toBeInTheDocument();
  });
});
