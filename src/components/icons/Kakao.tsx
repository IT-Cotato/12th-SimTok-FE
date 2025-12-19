import * as React from "react";
import type { SVGProps } from "react";

const KakaoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 26"
    {...props}
  >
    <g clipPath="url(#kakao_svg__a)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M11.5.867C5.148.867 0 5.363 0 10.909c0 3.449 1.991 6.49 5.024 8.298l-1.276 5.268c-.113.466.358.837.72.567l5.592-4.172c.472.051.952.081 1.44.081 6.351 0 11.5-4.496 11.5-10.042S17.851.867 11.5.867"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="kakao_svg__a">
        <path fill="#fff" d="M0 0h23v26H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default KakaoIcon;
