import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="title">
        <Link href="/">
          <h2>HalaqaMetrash</h2>
        </Link>
      </div>
    </div>
  );
}
