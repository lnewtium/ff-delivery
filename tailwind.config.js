/** @type {import('tailwindcss').Config} */

import preset from "nativewind/preset";

export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const presets = [preset];
export const theme = {
  extend: {},
};
export const plugins = [];
