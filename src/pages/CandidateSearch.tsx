import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  avatar_url: string;
  login: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentCandidate, setCandidate] = useState<Candidate | null>(null);

  const fetchCandidates = async () => {
    const data = await searchGithub();
    console.log('searchGithub', data); // logs the search results
    
   
    setCandidates(data.map((candidateOBJ:any) => candidateOBJ.login));
    
     const candidate = await searchGithubUser(data[0].login);
    setCandidate(candidate);
    setCurrentIndex(0);
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  const saveCandidate = () => {
  
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...saved, currentCandidate]));
    showNextCandidate();
  };

  const rejectCandidate = () => {
    showNextCandidate();
  };

  const showNextCandidate = async () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const candidate = await searchGithubUser(candidates[currentIndex]);
      setCandidate(candidate);
    } else {
      await fetchCandidates();

    }
  };

  if (!candidates.length) {
    return <h2>Loading candidates...</h2>;
  }



  return (
    <section className="candidate-container">
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate?.avatar_url} alt="Candidate Avatar" />
        <h2>{currentCandidate?.login}</h2>
        <p>Location: {currentCandidate?.location || 'Unknown'}</p>
        <p>Email: {currentCandidate?.email || 'Not available'}</p>
        <p>Company: {currentCandidate?.company || 'Not specified'}</p>
        <p>Bio: {currentCandidate?.bio || 'No bio available'}</p>
        <div className="button-container">
          <button onClick={rejectCandidate} className="reject">
            <span>−</span>
          </button>
          <button onClick={saveCandidate} className="save">
            <span>+</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CandidateSearch;


