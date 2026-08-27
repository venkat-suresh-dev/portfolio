import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from regenerating AGENTS.md over the design authority.
  agentRules: false,
};

export default nextConfig;
