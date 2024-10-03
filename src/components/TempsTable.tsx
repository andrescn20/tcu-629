import { use } from 'echarts';
import React, { useEffect, useState } from 'react';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

interface ITemperatureData {
  id: number;
  timestamp: string;
  temperature: number;
}

interface TemperatureTableProps {
  data: ITemperatureData[];
}

const TemperatureTable: React.FC<TemperatureTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  // Handle sorting by a given key (temperature or timestamp)
  const handleSort = (key: 'temperature' | 'timestamp') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...filteredData].sort((a, b) => {
      // Special handling for timestamp sorting (convert to Date objects)
      if (key === 'timestamp') {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }

      // Sorting for temperature (numerical sorting)
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  // Determine sort arrow direction
  const getSortArrow = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div>{
      filteredData.length !== 0 && 
      <table className="min-w-full border-2 bg-slate-100 rounded-2xl">
        <thead className="bg-white border-b-2 border-slate-500">
          <tr>
            <th
              className="py-2 px-4 text-start cursor-pointer"
              onClick={() => handleSort('timestamp')}
              >
              Fecha {getSortArrow('timestamp')}
            </th>
            <th
              className="py-2 px-4 text-start cursor-pointer"
              onClick={() => handleSort('temperature')}
              >
              Temperatura {getSortArrow('temperature')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((temperature, index) => (
            <tr key={temperature.id} className={`${index % 2 !== 0 ? 'bg-slate-300' : ''}`}>
              <td className="py-2 px-4">{temperature.timestamp}</td>
              <td className="py-2 px-4">{temperature.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
  }
    </div>
  );
};

export default TemperatureTable;
