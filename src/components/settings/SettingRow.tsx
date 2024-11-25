import styled from "styled-components";
import { Text } from "../../styles/TextStyle";

interface ISettingRowProps {
  label: string;
  icon: JSX.Element;
  value: string;
  onClick: () => void;
}

const StyledSettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
  color: ${({ theme: { text } }) => text};

  &:hover {
    background-color: ${({ theme: { color_grey_2 } }) => color_grey_2};
    cursor: pointer;
  }
`;
const SettingRow = ({ label, icon, value, onClick }: ISettingRowProps) => {
  return (
    <StyledSettingRow onClick={onClick}>
      {icon}
      <Text>{`${label}: ${value}`}</Text>
    </StyledSettingRow>
  );
};

export default SettingRow;
