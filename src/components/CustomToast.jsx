import toast from "react-hot-toast";

const errorToast = ({
  title,
  message,
  duration = 5000,
  style = { color: "red", fontFamily: "Sans-serif", fontSize: "14px" },
}) => {
  toast.error(
    <span style={style}>
      <strong>{title}:</strong> {message}
    </span>,
    {
      duration, // Optional: Adjust the toast display duration
    }
  );
};

const waringToast = ({
  title,
  message,
  duration = 5000,
  style = { color: "black", fontFamily: "Sans-serif", fontSize: "14px" },
}) => {
  toast(
    <span style={style}>
      <strong>{title}:</strong> {message}
    </span>,
    {
      duration, // Optional: Adjust the toast display duration
    }
  );
};

const successToast = ({
  title,
  message,
  duration = 5000,
  style = { color: "green", fontFamily: "Sans-serif", fontSize: "14px" },
}) => {
  toast.success(
    <span style={style}>
      <strong>{title}:</strong> {message}
    </span>,
    {
      duration, // Optional: Adjust the toast display duration
    }
  );
};

export { errorToast, successToast, waringToast };
