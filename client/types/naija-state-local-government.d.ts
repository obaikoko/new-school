// types/naija-state-local-government.d.ts
declare module 'naija-state-local-government' {
  const NaijaStates: {
    states: () => string[];
    lgas: (state: string) => { lgas: string[] };
  };
  export default NaijaStates;
}
