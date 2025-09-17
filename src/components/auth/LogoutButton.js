import Button from "@/components/ui/Button";

export default function LogoutButton({ children = "Logout", redirectTo = "/", onLoggedOut, ...props }) {
  const doLogout = async () => {
    try {
      await fetch("/api/logout");
      if (typeof onLoggedOut === "function") {
        onLoggedOut();
        return;
      }
      if (redirectTo) {
        window.location.href = redirectTo;
        return;
      }
      window.location.reload();
    } catch {
      // no-op
    }
  };

  return (
    <Button type="button" onClick={doLogout} {...props}>
      {children}
    </Button>
  );
}

