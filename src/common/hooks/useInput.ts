import React, { useState, useCallback } from 'react';

const useInput = <T>(
  initialValue: T,
  validate: (value: T) => boolean
): [T, boolean, React.FormEventHandler, () => void] => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e) => {
    const { value } = e.target;

    if (validate(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setValue(value);
  }, []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, isValid, handleChange, reset];
};

export default useInput;
