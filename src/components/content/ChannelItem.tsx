import { useAppContext } from "../../context/AppContext";
import { Text } from "../../styles/TextStyle";

const ChannelItem = () => {
  const { fetchChannelDetails } = useAppContext();

  return (
    <div>
      <Text>{fetchChannelDetails?.snippet?.title}</Text>
    </div>
  );
};

export default ChannelItem;
