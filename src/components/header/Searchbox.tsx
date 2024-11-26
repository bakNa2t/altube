import "regenerator-runtime/runtime";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { FaMicrophone } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useAppContext } from "../../context/AppContext";
import { IconStyle } from "../../styles/IconStyle";

const StyledSearchbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledSearchBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5rem;
  width: 33.5vw;
  border-radius: 100rem;
  border: 1px solid ${({ theme: { color_grey_2 } }) => color_grey_2};
  background-color: ${({ theme: { color_grey_2 } }) => color_grey_2};
  overflow: hidden;

  input {
    font-size: inherit;
    padding-left: 1rem;
    color: ${({ theme: { text } }) => text};
    background-color: ${({ theme: { bgr } }) => bgr};
  }
`;

const Searchbox = () => {
  const [searchValue, setSearchValue] = useState("");
  const { text, setSearchBarText } = useAppContext();

  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchValue(transcript);
    setSearchBarText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <StyledSearchbox>
      <StyledSearchBar>
        <input
          value={searchValue}
          placeholder={text.search}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* Search Icon */}
        <IconStyle
          data-tooltip-id="search"
          data-tooltip-content={text.search}
          onClick={() => setSearchBarText(searchValue)}
        >
          <LuSearch size={20} />
        </IconStyle>
      </StyledSearchBar>

      {/* Voice Search Icon */}
      <IconStyle
        data-tooltip-id="voiceSearch"
        data-tooltip-content={text.voiceSearch}
        $showBackground={true}
        className={listening ? "listening" : ""}
        onClick={
          SpeechRecognition.startListening as MouseEventHandler<HTMLDivElement>
        }
      >
        <FaMicrophone size={20} />
      </IconStyle>
    </StyledSearchbox>
  );
};

export default Searchbox;
