import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function Tsparticles() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
     fullScreen: {
       enable: true
     },
     fpsLimit: 90,
     particles: {
       groups: {
         z5000: {
           number: {
             value: 50
           },
           zIndex: {
             value: 4000
           }
         },
         z7500: {
           number: {
             value: 30
           },
           zIndex: {
             value: 75
           }
         },
         z2500: {
           number: {
             value: 50
           },
           zIndex: {
             value: 25
           }
         },
         z1000: {
           number: {
             value: 40
           },
           zIndex: {
             value: 10
           }
         }
       },
       number: {
         value: 200,
         density: {
           enable: false,
           value_area: 800
         }
       },
       color: {
         value: "#fff",
         animation: {
           enable: false,
           speed: 20,
           sync: true
         }
       },
       shape: {
         type: "circle"
       },
       opacity: {
         value: 1,
         random: false,
         animation: {
           enable: false,
           speed: 3,
           minimumValue: 0.1,
           sync: false
         }
       },
       size: {
         value: 3
       },
       links: {
         enable: false,
         distance: 100,
         color: "#ffffff",
         opacity: 0.4,
         width: 1
       },
       move: {
         angle: {
           value: 10,
           offset: 0
         },
         enable: true,
         speed: 2, //gert
         direction: "right",
         random: false,
         straight: true,
         outModes: {
           default: "out"
         },
         attract: {
           enable: false,
           rotateX: 600,
           rotateY: 1200
         }
       },
       zIndex: {
         value: 5,
         opacityRate: 0.5
       }
     },
     interactivity: {
       detectsOn: "canvas",
       events: {
         onHover: {
           enable: false,
           mode: "repulse"
         },
         onClick: {
           enable: true,
           mode: "push"
         },
         resize: true
       },
       modes: {
         grab: {
           distance: 400,
           links: {
             opacity: 1
           }
         },
         bubble: {
           distance: 400,
           size: 40,
           duration: 2,
           opacity: 0.8
         },
         repulse: {
           distance: 200
         },
         push: {
           quantity: 4,
           groups: ["z5000", "z7500", "z2500", "z1000"]
         },
         remove: {
           quantity: 2
         }
       }
     },
     detectRetina: true,
     background: {
       color: "#000000",
       image: "",
       position: "50% 50%",
       repeat: "no-repeat",
       size: "cover"
     },
     emitters: {
       position: {
         y: 55,
         x: -30
       },
       rate: {
         delay: 7,
         quantity: 1
       },
       size: {
         width: 0,
         height: 0
       },
     }
   }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}

export default Tsparticles;
