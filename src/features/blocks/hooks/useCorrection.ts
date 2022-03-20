import { CORRECTION } from '../../../common/constants/correction';
import { ParagraphType } from '../types';

const useCorrection = ({
  type,
  value,
  callback,
}: {
  type: ParagraphType;
  value: string;
  callback: (message: string) => void;
}) => {
  try {
    checkValue(value);
    callback('');
  } catch (message) {
    callback(message as string);
  }

  switch (type) {
    case 'P': {
      try {
        checkPType(value);
      } catch (message) {
        callback(message as string);
      }
      return;
    }
    case 'R': {
      try {
        checkRType(value);
      } catch (message) {
        callback(message as string);
      }
      return;
    }
    case 'E': {
      try {
        checkEType(value);
      } catch (message) {
        callback(message as string);
      }
      return;
    }
  }
};

export default useCorrection;

const checkValue = (value: string) => {
  if (value.includes('\n')) {
    throw CORRECTION.NO_NEW_LINE;
  }

  if (value.length < 10) {
    throw CORRECTION.MIN_LETTER;
  }

  if (value.length > 300) {
    throw CORRECTION.MAX_LETTER;
  }
};

const checkPType = (value: string) => {
  const example = /(예를 들면)|(예시로)|(예로)/gm;
  if (example.test(value)) {
    throw CORRECTION.NO_EXAMPLE;
  }

  if (value.includes('?')) {
    throw CORRECTION.NO_QUESTION;
  }

  const but = /(하지만)|(그러나)/gm;
  if (but.test(value)) {
    throw CORRECTION.NO_BUT;
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (reason.test(value)) {
    throw CORRECTION.NO_REASON;
  }
};

const checkRType = (value: string) => {
  const example = /(예를 들면)|(예시로)|(예로)/gm;
  if (example.test(value)) {
    throw CORRECTION.NO_EXAMPLE;
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (!reason.test(value)) {
    throw CORRECTION.RESULT_REQUIRED;
  }

  if (value.includes('결론적으로')) {
    throw CORRECTION.NO_RESULT;
  }
};

const checkEType = (value: string) => {
  if (value.includes('결론적으로')) {
    throw CORRECTION.NO_RESULT;
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (reason.test(value)) {
    throw CORRECTION.NO_REASON;
  }
};
