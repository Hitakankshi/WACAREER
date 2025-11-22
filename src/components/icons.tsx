import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 50"
      width="80"
      height="50"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E5C07B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="5"
        y="35"
        fontFamily="'Playfair Display', serif"
        fontSize="28"
        fill="url(#goldGradient)"
        fontWeight="bold"
      >
        W.A
      </text>
    </svg>
  );
}
