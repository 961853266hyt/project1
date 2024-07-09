import React, { useState } from 'react';

const ManualErrorTest: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Manual error for testing Error Boundary');
  }

  return (
    <div>
      <button onClick={() => setHasError(true)}>Trigger Error</button>
    </div>
  );
};

export default ManualErrorTest;