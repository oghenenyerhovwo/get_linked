import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

// importing screens
import HomeScreen from "./screens/HomeScreen"
import ContactScreen from "./screens/ContactScreen"
import RegisterScreen from "./screens/RegisterScreen"

// importing components
import { Header, AppContainer } from "./components"

// css
import "./App.css"

function App() {
  return (
    <BrowserRouter>
        <AppContainer>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/contact" element={<ContactScreen />} exact></Route> 
              <Route path="/register" element={<RegisterScreen />} exact></Route> 
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