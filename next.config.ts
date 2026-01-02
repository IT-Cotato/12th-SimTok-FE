import type { NextConfig } from "next";

import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  webpack(config) {
    const rules = config.module?.rules as RuleSetRule[];

    const fileLoaderRule = rules.find(
      rule => rule.test instanceof RegExp && rule.test.test(".svg"),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {},
};

export default nextConfig;
