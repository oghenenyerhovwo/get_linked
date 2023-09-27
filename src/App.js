import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

// importing screens
import HomeScreen from "./screens/HomeScreen"

// importing components
import { Header, AppContainer } from "./components"

// css
import "./App.css"

function App() {

  return (
    <BrowserRouter>
        <AppContainer>
          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact></Route> 
            </Routes>
            <Routes>
              
            </Routes>         
          </main>
        </AppContainer>
    </BrowserRouter>
  );
}

export default App;