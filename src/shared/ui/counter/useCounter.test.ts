import { renderHook, act } from "@testing-library/react";
import { fn } from "@vitest/spy";
import { useCounter } from "./useCounter";

describe("useCounter hook", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.value).toBe(5);
  });

  it("should increment the value", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
  });

  it("should decrement the value", () => {
    const { result } = renderHook(() => useCounter(2));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.value).toBe(1);
  });

  it("should call onChange when value changes", () => {
    const onChange = fn();
    const { result } = renderHook(() => useCounter(0, onChange));
    act(() => {
      result.current.increment();
    });
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
