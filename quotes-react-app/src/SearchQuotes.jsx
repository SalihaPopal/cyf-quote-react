import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://quote-server-g1vv.onrender.com/');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filterQuotes = () => {
      if (!quote || !searchTerm) {
        setFilteredQuotes([]);
        return;
      }

      const filtered = [quote].filter((quote) =>
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuotes(filtered);
    };

    fetchRandomQuote();
    filterQuotes(); // Call filterQuotes here as part of the effect
  }, [quote, searchTerm]);

  return (
    <div className="App">
      <h1>Random Quote</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for quotes"
      />
      <div>
        {searchTerm
          ? filteredQuotes.length > 0
            ? filteredQuotes.map((quote) => (
                <div key={quote.id}>
                  <div>{quote.quote}</div>
                  <footer>- {quote.author}</footer>
                </div>
              ))
            : <div>No quotes found.</div>
          : (
            <div>
              {quote ? `"${quote}"` : 'Fetching quote...'}
              {author ? <footer>- {author}</footer> : null}
            </div>
          )}
      </div>
      <button onClick={fetchRandomQuote}>Get New Quote</button>
    </div>
  );
}

export default App;

















// import React, { useState, useEffect, useCallback } from 'react';
// import './App.css';

// function App() {
//   const [quote, setQuote] = useState(null);
//   const [author, setAuthor] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredQuotes, setFilteredQuotes] = useState([]);

//   const fetchRandomQuote = async () => {
//     try {
//       const response = await fetch('https://quote-server-g1vv.onrender.com/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch quote');
//       }
//       const data = await response.json();
//       setQuote(data.quote);
//       setAuthor(data.author);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filterQuotes = useCallback(() => {
//     if (!quote || !searchTerm) {
//       setFilteredQuotes([]); // Reset filteredQuotes to an empty array if there is no search term
//       return;
//     }

//     const filtered = [quote].filter((quote) =>
//       quote.quote.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredQuotes(filtered);
//   }, [quote, searchTerm]);

//   useEffect(() => {
//     fetchRandomQuote();
//     filterQuotes(); // Call filterQuotes here as part of the effect
//   }, [filterQuotes]);

//   return (
//     <div className="App">
//       <h1>Random Quote</h1>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search for quotes"
//       />
//       <blockquote>
//         {searchTerm
//           ? filteredQuotes.length > 0
//             ? filteredQuotes.map((quote) => (
//                 <div key={quote.id}>
//                   <div>{quote.quote}</div>
//                   <footer>- {quote.author}</footer>
//                 </div>
//               ))
//             : <div>No quotes found.</div>
//           : (
//             <div>
//               {quote ? `"${quote.quote}"` : 'Fetching quote...'}
//               {author ? <footer>- {author}</footer> : null}
//             </div>
//           )}
//       </blockquote>
//       <button onClick={fetchRandomQuote}>Get New Quote</button>
//     </div>
//   );
// }

// export default App;

