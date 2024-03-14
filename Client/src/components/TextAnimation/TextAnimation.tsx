import { TypeAnimation, Sequence } from "react-type-animation";
import GraphemeSplitter from "grapheme-splitter"; // npm i grapheme-splitter

function TextAnimation({ sequence }: { sequence: Sequence }) {
    const splitter = new GraphemeSplitter();
    return (
        <TypeAnimation
            splitter={(s) => splitter.splitGraphemes(s)}
            sequence={sequence}
            wrapper="span"
            speed={50}
            style={{
                fontSize: "3em",
                display: "inline-block",
                color: "white",
                fontStyle: "normal",
                fontFamily: "monospace",
                fontWeight: "bold",
                lineHeight: "2em",
            }}
            repeat={Infinity}
        />
    );
}
export default TextAnimation;
