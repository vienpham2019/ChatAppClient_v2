export const calTimeAgo = (inputDate) => {
  const now = new Date();
  const past = new Date(inputDate);
  if (isNaN(past.getTime())) return "Invalid date"; // Handle invalid dates
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

export const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatLabel = (str) =>
  str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (s) => s.toUpperCase()); // Capitalize the first letter

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const getUniqueNum = () => Math.random().toString(36).substring(2, 9);

export const isSubset = (a, b) => a.every((item) => b.includes(item));

export const getTime = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getDate = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US"); // returns "4/28/2025"
};
