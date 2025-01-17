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







  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
