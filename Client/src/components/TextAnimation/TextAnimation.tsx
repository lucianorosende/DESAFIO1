import { TypeAnimation, Sequence } from "react-type-animation";

function TextAnimation({ sequence }: { sequence: Sequence }) {
    return (
        <TypeAnimation
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
            }}
            repeat={Infinity}
        />
    );
}
export default TextAnimation;
