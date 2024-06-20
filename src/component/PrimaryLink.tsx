import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

interface PrimaryLinkProps {
  href: string;
  className?: string; // Allow className to be optional
  children: React.ReactNode;
}

export function PrimaryLink({ href, className, children }: PrimaryLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
