// import React, { useState } from 'react';

// interface InputBoxProps {
//   label: string;
//   value: number;
//   onChange: (value: number) => void;
// }

// const InputBox: React.FC<InputBoxProps> = ({ label, value, onChange }) => {
//   const [inputValue, setInputValue] = useState(value.toString());

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = parseInt(event.target.value);
//     setInputValue(event.target.value);

//     if (!isNaN(newValue)) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div>
//       <label>{label}</label>
//       <input type="text" value={inputValue} onChange={handleChange} />
//     </div>
//   );
// };

// export default InputBox;
