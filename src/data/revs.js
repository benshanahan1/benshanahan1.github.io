// Revision history: one entry per career milestone. The table on the home page and
// the flags in Fig. 1 both come from this list, newest last.
//
// Figure fields:
//   via      breakout junction the wire leaves from (see J in scripts/brain.js)
//   node     neuron position; balloon: flag position; side: where the flag's label sits
//   zone     "cb" for a neuron in the cerebellum
//   through  earlier revs this wire runs out through (a branch off that company's nerve)
//   relay    a wire continues past this neuron, so its dendrites leave that direction clear
//   now      the current rev: filled flag and a pulse
// Each neuron sits in a region that fits the work: thalamus (relay everything routes through),
// cerebellum (hands-on building), motor cortex (where BrainGate implants), hippocampus (where
// NeuroPace's leads usually go), parietal / sensory / supplementary motor for SpaceX, and
// prefrontal and premotor for Senra.
export const REVS = [
  {
    rev: "A", date: "2013–2017", title: "Neuroscience, Brown University", tag: "Initial release",
    desc: "Sc.B. in neuroscience with honors, magna cum laude, 2017.",
    label: "NEUROSCIENCE", via: "hub", node: [396, 286], balloon: [618, 300], side: "b",
  },
  {
    rev: "B", date: "2013–2018", title: "Side projects at Brown",
    desc: 'Drones, rockets and light shows, mostly built solo or with friends. See <a href="/projects/lunadrop/">Lunadrop</a> and the <a href="/projects/rocketry/">Open Rocketry Initiative</a>.',
    label: "PROJECTS", via: "cerebellar", node: [478, 392], balloon: [612, 410], side: "b", zone: "cb",
  },
  {
    rev: "C", date: "2016–2018", title: "BrainGate lab, Brown University",
    desc: "After graduating I spent a year in the BrainGate lab doing brain-computer interface research. I built a real-time monitoring system for the BrainGate research cart and worked on FPGA hardware with a grad student.",
    label: "BRAINGATE", via: "superior", node: [286, 165], balloon: [4, 236], side: "b",
  },
  {
    rev: "D", date: "2018–2021", title: "NeuroPace",
    desc: "Moved to the Bay Area. I built internal systems that took our research scientists' analyses into production and presented them to doctors, in support of new epilepsy therapies on NeuroPace's implanted medical device.",
    label: "NEUROPACE", via: "temporal", node: [278, 350], balloon: [200, 420], side: "l",
  },
  // SpaceX is one nerve: Starlink and telemetry branch off at Warpdrive
  {
    rev: "E", date: "Late 2020–2023", title: "SpaceX, Warpdrive",
    desc: "Moved to LA to join the Warpdrive team. Warpdrive is SpaceX's in-house Enterprise Resource Planning and Execution System, used to build rockets and satellites.",
    label: "SPACEX", via: "parietal", node: [395, 120], balloon: [572, 56], side: "b", relay: true,
  },
  {
    rev: "F", date: "Mid 2021–mid 2022", title: "Starlink factory",
    desc: "On the Manufacturing Execution System team in the Starlink factory, building user terminals at rate. Between Starlink and rocket engines I saw both high-rate, low-complexity and low-rate, high-complexity production at scale.",
    label: "STARLINK", via: "parietal", through: ["E"], node: [262, 70], balloon: [295, -24], side: "r",
  },
  {
    rev: "G", date: "Mid 2022–early 2023", title: "Telemetry at SpaceX",
    desc: "A stint on the system that records massive amounts of high-rate continuous data from engine tests, launches and satellites.",
    label: "TELEMETRY", via: "parietal", through: ["E"], node: [345, 128], balloon: [445, -24], side: "r",
  },
  {
    rev: "H", date: "Early 2023–now", title: "Co-founded Senra, built Amp",
    desc: "Jordan Black and I started Senra in 2023. I spent the first three years building Amp, basically Warpdrive-lite for wire harness manufacturing.",
    label: "SENRA", via: "prefrontal", node: [140, 160], balloon: [16, 60], side: "b",
  },
  {
    rev: "J", date: "Mid 2026–now", title: "AI and robotics at Senra", tag: "Current", now: true,
    desc: "In mid-2026 I shifted my focus to applying AI and robotics to precision assembly. The goal is to give our technicians superpowers: vision for inspection, robots for the hardest assembly steps, and agents across our software.",
    label: "ROBOTICS", via: "frontal", node: [218, 150], balloon: [150, -24], side: "r",
  },
];

export const CURRENT_REV = REVS[REVS.length - 1].rev;
