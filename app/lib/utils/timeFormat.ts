export function formatTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const getDate = (dateString: string | Date): Date => {
  if (typeof dateString === "string") {
    return new Date(dateString);
  }
  if (dateString instanceof Date) {
    return dateString;
  }

  return new Date(dateString);
};

export const formatDate = ({
  isoDateString,
  showTime,
  showYear,
}: {
  isoDateString: string | Date;
  showTime?: boolean;
  showYear?: boolean;
}): string => {
  try {
    // Parse the ISO 8601 date string into a Date object
    const date = getDate(isoDateString);

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Check if the date is within the last 24 hours
    if (diffInSeconds < 86400) {
      if (diffInSeconds < 60) {
        return `${diffInSeconds} sec ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} min ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      }
    }

    // get the current year
    const currentYear = now.getFullYear();

    // Get the month name using toLocaleDateString with options for formatting
    const monthName = date.toLocaleDateString("en-US", { month: "short" });

    // Check if the date is from the current year
    const isCurrentYear = date.getFullYear() === currentYear;

    const year = isCurrentYear || !showYear ? "" : `, ${date.getFullYear()}`;

    // Construct the formatted date string
    let formattedDate = `${monthName} ${date.getDate()} ${year}`;

    // Add time to the formatted date string if showTime is true
    if (showTime) {
      const formattedTime = formatTime(date);
      formattedDate += ` | ${formattedTime}`;
    }
    return formattedDate;
  } catch (error) {
    // Handle any errors during parsing or formatting
    console.error("Error formatting date:", error);
    return ""; // Or return a default value if needed
  }
};
