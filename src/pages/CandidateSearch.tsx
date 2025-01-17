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





  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
