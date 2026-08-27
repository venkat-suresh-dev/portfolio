"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type InViewOnceProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  amount?: number;
  simplifyOnMobile?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

export function InViewOnce<T extends ElementType = "div">({
  children,
  className,
  as,
  amount = 0.22,
  simplifyOnMobile = false,
  ...props
}: InViewOnceProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (reduce || (simplifyOnMobile && mobile)) {
      el.dataset.inview = "true";
      return;
    }

    el.dataset.enhanced = "true";
    el.dataset.inview = "false";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount, simplifyOnMobile]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
