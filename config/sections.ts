type SectionColor = {
  background: string;
  border: string;
  text: string;
};

//https://coolors.co/59ca02-fb590e-e00061-741fea-3381ff
export const sectionColors = {
  purple: {
    background: "#741FEA",
    border: "#8338EC",
    text: "#FFFFFF",
  },
  blue: {
    background: "#0A68FF",
    border: "#3381FF",
    text: "#FFFFFF",
  },
  green: {
    background: "#58CC02",
    border: "#6AF202",
    text: "#FFFFFF",
  },
  rose: {
    background: "#E00061",
    border: "#FF006E",
    text: "#FFFFFF",
  },
} satisfies Record<string, SectionColor>;

export type SectionColorName = keyof typeof sectionColors;

const colorKeys = Object.keys(sectionColors);

export function getSectionColor(index: number) {
  return colorKeys[index % colorKeys.length] as keyof typeof sectionColors;
}
