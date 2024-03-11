import Particles from "react-tsparticles";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ISourceOptions } from "tsparticles-engine";
function Background({ options }: { options: ISourceOptions }) {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);
    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log(container);
        },
        []
    );
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
        />
    );
}

export default Background;
