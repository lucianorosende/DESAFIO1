import { TypeAnimation } from "react-type-animation";
import GraphemeSplitter from "grapheme-splitter"; // npm i grapheme-splitter

export function TextAnimation({ sequence }: { sequence: any }) {
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
