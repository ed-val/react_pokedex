import React from 'react';

const StatsTable = ({stats}) => {
  return (
    <table className='highlight'>
      <thead>
        <tr>
          <th>Type</th>
          <th>Effort</th>
          <th>Base</th>
        </tr>
      </thead>

      <tbody>
        {
          stats.map((stat, i) => {
            return (
              <tr key={i.toString()}>
                <td>{stat.name}</td>
                <td>{stat.effort}</td>
                <td>{stat.base}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default StatsTable;
