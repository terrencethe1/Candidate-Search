import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);



  return (
    <>
      <h1>Potential Candidates</h1>
    </>
  );
};

export default SavedCandidates;
