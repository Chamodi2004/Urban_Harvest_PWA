function NotificationButton() {
  const [permission, setPermission] =
    typeof Notification !== "undefined"
      ? Notification.permission
      : "denied";

  const updatePermission = () => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  };

  const notify = async () => {
    if (typeof Notification === "undefined") {
      alert("Notifications are not supported in this browser.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Urban Harvest Hub", {
        body: "New sustainability event added!",
      });
      return;
    }

    if (Notification.permission === "denied") {
      alert("Notifications are blocked. Please enable them in your browser settings.");
      return;
    }

    const result = await Notification.requestPermission();
    updatePermission();

    if (result === "granted") {
      new Notification("Urban Harvest Hub", {
        body: "Notifications enabled — stay tuned for updates!",
      });
    }
  };

  const label =
    permission === "granted"
      ? "Notifications Enabled"
      : permission === "denied"
      ? "Notifications Blocked"
      : "Enable Notifications";

  return (
    <button
      className="secondary-btn"
      onClick={notify}
      disabled={permission === "denied"}
      title={permission === "denied" ? "Notifications blocked" : ""}
    >
      {label}
    </button>
  );
}

export default NotificationButton;

