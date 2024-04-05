import Particles from "react-tsparticles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ISourceOptions } from "tsparticles-engine";
export function Background({ options }: { options: ISourceOptions }) {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles id="tsparticles" init={particlesInit} options={options} />
    );
}
