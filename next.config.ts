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
      // issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "symtalk-image.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "43.202.184.232.nip.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.imyfone.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
