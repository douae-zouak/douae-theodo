import "./index.css";
import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Jeu from "./sections/Jeu";
import Miroir from "./sections/Miroir";
import Candidat from "./sections/Candidat";
import Methode from "./sections/Methode";
import Revelation from "./sections/Revelation";
import Close from "./sections/Close";
import Outro from "./sections/Outro";

export default function App() {
  return (
    <>
      <CustomCursor />

      <main style={{ backgroundColor: "var(--bg)" }}>
        <Jeu />
        <Miroir />
        <Candidat />
        <Methode />
        <Revelation />
        <Close />
        <Outro />
      </main>
    </>
  );
}
