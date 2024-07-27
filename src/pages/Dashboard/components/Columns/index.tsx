import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Registration = {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
  id: string;
};

type Props = {
  registrations?: Registration[];
};

const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column
            status={collum.status}
            key={collum.title}
            aria-labelledby={collum.status}
          >
            <>
              <S.TitleColumn id={collum.status} status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations
                  ?.filter(
                    (registration) => registration.status === collum.status
                  )
                  ?.map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
