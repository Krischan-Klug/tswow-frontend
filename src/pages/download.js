import useRealmInfo from "../lib/useRealmInfo";
import ContentWrapper from "@/components/ui/ContentWrapper";
import NavLink from "@/components/ui/NavLink";
import Card from "@/components/ui/Card";
import { Center } from "@/components/ui/Text";
import styled from "styled-components";

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
      <Card>
        <Center>
          <h3>Realmlist:</h3>
          <RealmlistText>{"set realmlist " + realm.address}</RealmlistText>
        </Center>
      </Card>
    </ContentWrapper>
  );
}

const RealmlistText = styled.p`
  padding: 0 50px;
`;
