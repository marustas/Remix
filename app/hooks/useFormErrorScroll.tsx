import { useEffect, useRef } from "react";

export function useFormErrorScroll<T extends string>(
  errors?: Partial<Record<T, string>>,
) {
  const fieldRefs = useRef<Record<T, HTMLElement | null>>({} as any);
  const fieldOrder = useRef<Set<T>>(new Set());

  function register(name: T) {
    if (!fieldOrder.current.has(name)) {
      fieldOrder.current.add(name);
    }

    return (el: HTMLElement | null) => {
      fieldRefs.current[name] = el;
    };
  }

  useEffect(() => {
    if (!errors) return;

    const firstInvalidField = Array.from(fieldOrder.current).find(
      (name) => errors[name],
    );

    if (!firstInvalidField) return;

    const el = fieldRefs.current[firstInvalidField];

    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus();
  }, [errors]);

  return register;
}
