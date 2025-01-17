import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const rejectCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (!savedCandidates.length) {
    return <h2>No saved candidates yet.</h2>;
  }

  return (
    <section style={{ marginTop: '50px' }}>

      <h1>Potential Candidates</h1>
      <table style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.avatar_url} alt="Avatar" width="70px" /></td>
              <td>{candidate.login}</td>
              <td>{candidate.location || 'Unknown'}</td>
              <td>{candidate.email || 'Not available'}</td>
              <td>{candidate.company || 'Not specified'}</td>
              <td>{candidate.bio || 'No bio available'}</td>
              <td>
                <button onClick={() => rejectCandidate(index)} className="reject">
                  <span>−</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SavedCandidates;
