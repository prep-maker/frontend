import React, { useState, useCallback, useEffect } from 'react';

const useInput = (
  initialValue: string,
  validate: (value: string) => boolean
): [string, boolean, React.FormEventHandler, () => void] => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

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
