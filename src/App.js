import { useState } from "react";
import Card from "./components/Card/Card";

function App() {
  const [dark, setDark]  = useState(false)
  return (
    <div style={{background: dark ? "#000" : "",
    height: "150%"}}>
      <Card dark={dark} setDark={setDark}/>
    </div>
  );
}

export default App;
