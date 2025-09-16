import useRealmInfo from "../lib/useRealmInfo";
import ContentWrapper from "@/components/ui/ContentWrapper";
import NavLink from "@/components/ui/NavLink";
import Card from "@/components/ui/Card";

export default function Download() {
  const { realm, loading, error } = useRealmInfo(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ContentWrapper>
      <h1>Download</h1>
      <NavLink href="https://google.com">Click here</NavLink>
      <Card style={{ textAlign: "center" }}>
        <h3>Realmlist:</h3>
        <p style={{ padding: "0 50px" }}>{"set realmlist " + realm.address}</p>
      </Card>
    </ContentWrapper>
  );
}
