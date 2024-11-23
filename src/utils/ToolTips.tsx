import { Tooltip } from "react-tooltip";

const ToolTips = () => {
  const TIPS = ["settings", "search", "voiceSearch", "profile", "logout"];

  return (
    <>
      {TIPS.map((id, index) => (
        <Tooltip
          id={id}
          key={index}
          style={{ zIndex: 1000, fontSize: 10 }}
          noArrow={true}
        />
      ))}
    </>
  );
};

export default ToolTips;
