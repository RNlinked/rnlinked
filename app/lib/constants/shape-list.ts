export type ShapeItem = {
  type: ShapeType;
  color?: string;
  image?: string;
  text?: string;
};

type ShapeType =
  | "circle"
  | "square"
  | "rectangle"
  | "semicapsule"
  | "capsule"
  | "circle-square"
  | "square-circle"
  | "image";

export const getShapeClass = (shapeType: ShapeType) => {
  switch (shapeType) {
    case "circle":
      return " h-40 w-40 rounded-full ";
    case "square":
      return "h-44 w-44 sm:h-40 sm:w-40 rounded-2xl";
    case "rectangle":
      return "h-40 w-80 rounded-2xl";
    case "semicapsule":
      return "h-40 w-80 rounded-t-[64px] rounded-b-2xl";
    case "capsule":
      return "h-40 w-80 rounded-full";
    case "circle-square":
      return "h-44 w-44 sm:h-40 sm:w-40 rounded-l-full rounded-br-2xl ";
    case "square-circle":
      return "h-44 w-44 sm:h-40 sm:w-40 rounded-r-full rounded-br-2xl ";
    default:
      return "";
  }
};

export const shapeItemsMobile: ShapeItem[] = [
  {
    type: "square",
    image: "/hero/female-nrs-smiling.png",
  },
  { type: "square-circle", text: "Find your thribe" },
  {
    type: "circle-square",
    color: "bg-celery-400  rotate-270",
    image: "/hero/med-chart.png",
  },
  {
    type: "square",
    color: "bg-celery-100",
    image: "/hero/nurse-grp.png",
  },
];

export const shapeItems: ShapeItem[] = [
  {
    type: "square",
    color: "bg-tradewind-100",
    text: "Connect Share Learn",
  },
  {
    type: "square",
    color: "bg-contessa-400/0 scale-125",
    image: "/hero/male-nurse.png",
  },
  {
    type: "semicapsule",
    color: "bg-tradewind-300",
    text: "Share your knowledge",
  },
  {
    type: "square",
    color: "bg-celery-100",
    image: "/hero/nurse-grp.png",
  },
  {
    type: "circle-square",
    color: "bg-contessa-300",
    text: "Find support",
  },
  {
    type: "square",
    color: "bg-celery-600",
    image: "/hero/glove-hands.png",
  },
  {
    type: "square",
    color: "bg-celery-600",
    image: "/hero/smiling-nurse.png",
  },
  { type: "square-circle", text: "Find your thribe" },
  {
    type: "square",
    image: "/hero/female-nrs-smiling.png",
  },

  {
    type: "capsule",
    color: "bg-celery-300",
    text: "Quick Notes or Deep dive learning",
  },
  {
    type: "capsule",
    color: "bg-celery-800",
    image: "/hero/nursing-students.png",
  },

  {
    type: "circle-square",
    color: "bg-celery-400",
    image: "/hero/med-chart.png",
  },

  {
    type: "rectangle",
    color: "bg-celery-200",
    image: "/hero/nrs-pushing-wheelchair.png",
  },
];
