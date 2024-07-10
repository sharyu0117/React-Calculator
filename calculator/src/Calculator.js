import React, { useState } from 'react';
import CalculatorRow from './CalculatorRow';

const Calculator = () => {
  const [rows, setRows] = useState([{ value: 0, sign: '' }]);
  
  const handleAddRow = () => {
    setRows([...rows, { value: 0, sign: '' }]);
  };
  
  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  
  const handleToggleRow = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].enabled = !updatedRows[index].enabled;
    setRows(updatedRows);
  };
  
  const handleChangeValue = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].value = value;
    setRows(updatedRows);
  };
  
  const calculateResult = () => {
    return rows.reduce((acc, curr) => {
      if (curr.enabled) {
        return curr.sign === '+','-' ? acc + curr.value : acc - curr.value;
      }
      return acc;
    }, 0);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <CalculatorRow
          key={index}
          index={index}
          sign={row.sign}
          enabled={row.enabled}
          onToggle={handleToggleRow}
          onChange={handleChangeValue}
        />
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      {rows.length > 1 && <button onClick={() => handleRemoveRow(rows.length - 1)}>   Remove Row</button>}
      <div>
        Result: {calculateResult()}
      </div>
    </div>
  );
};

export default Calculator;