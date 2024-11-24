import styled from "styled-components";
import { Text } from "../../styles/TextStyle";

const StyledSettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 3rem;
  font-size: 0.6rem;
  padding-left: 1rem;
  color: ${({ theme: { text } }) => text};

  &:hover {
    background-color: ${({ theme: { color_grey_2 } }) => color_grey_2};
    cursor: pointer;
  }
`;
const SettingRow = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: JSX.Element;
  value: string;
}) => {
  return (
    <StyledSettingRow>
      {icon}
      <Text>{`${label}: ${value}`}</Text>
    </StyledSettingRow>
  );
};

export default SettingRow;
