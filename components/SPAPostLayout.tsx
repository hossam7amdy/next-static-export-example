import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function SPAPostLayout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-2">
      {children}
    </main>
  );
}
