export function getStandColor(category: string, status: string) {
  if (status === "booked") return "#B8B8B8";

  switch (category) {
    case "goff-standard":
      return "#8A9A5B";

    case "goff-premium-1":
      return "#D6A06A";

    case "goff-premium-2":
      return "#CF2133";

    case "goff-premium-3":
      return "#7F3F98";
    case "goff-small":
      return "#27AAE1";
    case "marquee-standard":
      return "#D6992F";
    case "marquee-premium-a":
      return "#2E3192";
    case "marquee-premium-b":
      return "#EC008C";
    case "marquee-premium-c":
      return "#F15A29";
    case "marquee-premium-d":
      return "#00A79D";
    case "outdoor":
      return "#D6992F";
  }
}
