import { createContext, type PropsWithChildren, useContext } from "react";

/**
 * Creates a React context with a safe way to consume it, ensuring that the context is always used within a provider.
 *
 * @template ContextValue - The type of the value that will be stored in the context.
 *
 * @param {string} errorMessage - The error message to throw if the context is used outside a provider.
 *
 * @returns {readonly [React.ComponentType<{ value: ContextValue } & PropsWithChildren<{}>>, () => ContextValue]} -
 * A tuple containing:
 * - `Provider`: A React component that provides the context value to its children.
 * - `useSafeContext`: A custom hook that safely consumes the context value, throwing an error if used outside a provider.
 *
 * @example
 * const [UserProvider, useUser] = createSafeContext("useUser must be used within a UserProvider");
 *
 * function App() {
 *   return (
 *     <UserProvider value={{ name: "John" }}>
 *       <ChildComponent />
 *     </UserProvider>
 *   );
 * }
 *
 * function ChildComponent() {
 *   const user = useUser(); // Safely consumes the context
 *   return <div>{user.name}</div>;
 * }
 */
export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };

  const Provider = ({
    value,
    children,
  }: PropsWithChildren<{ value: ContextValue }>) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
}
