import React, { useState, useEffect } from 'react';

const TestTables = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState('');
  
  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    console.log('Fetching data...');
    // const { data, error } = await supabase.from('temperatures').select("*");
    // if (error) {
    //   console.error('Error fetching data:', error);
    // } else {
    //   console.log('Data fetched', data);
    //   setData(data);
    // }
  };

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) console.error('Error logging out:', error);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data...');
    const { error } = await supabase
      .from('temperatures')
      .insert([{ temperature: newData }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      setNewData('');
      fetchData();
    };
  };

  return (
    <div>
      <h1>Database Test</h1>
        <>
          {/* <button onClick={handleLogout}>Log Out</button> */}
          <div>
            <h2 className='text-white'>Data from Supabase</h2>
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.temperature}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                placeholder="Enter new data"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
    </div>
  );
}

export default TestTables;
