import Particles from "react-tsparticles";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ISourceOptions } from "tsparticles-engine";
export function Background({ options }: { options: ISourceOptions }) {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);
    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {},
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
