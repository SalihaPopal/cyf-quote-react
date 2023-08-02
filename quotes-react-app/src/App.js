import React, {useEffect, useState} from "react";
import './App.css';

import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';



// const url = "https://saliha-quote-server.glitch.me/quote/random"

function App() {

  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  const fetchRandomQuotes = async () => {
    // console.log("button clicked")
   try {
     const response = await fetch("https://saliha-quote-server.glitch.me/quotes/random");
    if (!response.ok) {
      throw new Error("Failed to fetch quote.");
    }
    const data = await response.json();
    setQuote(data.quote);
    setAuthor(data.author);
   }
   catch (error) {
    console.log(error);
   }
  };

  useEffect(() => {
    fetchRandomQuotes();
   },[]);

  return (
    <div className="App">
      <h1>Quotes App</h1>
      <div className="quote">
        {quote ? <FaQuoteLeft size={18} style={{marginRight:"5px"}}/> : null}
        {quote ? `${quote}` : "Fetching quotes..."}
        {quote ? <FaQuoteRight size={18} style={{marginRight:"5px"}}/> : null}
      </div>
      <div className="author">
        {author ? <footer>{author} </footer> : null}
      </div>
      <button className="btn" onClick={fetchRandomQuotes}>New Quote</button>
    </div>
  );
}

export default App;




