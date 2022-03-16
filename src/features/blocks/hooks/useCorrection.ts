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
    throw '문단을 나눌 수 없습니다.';
  }

  if (value.length < 10) {
    throw '한 문단은 10글자 이상이어야 합니다.';
  }

  if (value.length > 300) {
    throw '한 문단은 300글자를 초과할 수 없습니다.';
  }
};

const checkPType = (value: string) => {
  const example = /(예를 들면)|(예시로)|(예로)/gm;
  if (example.test(value)) {
    throw 'P 문단에서 "예를 들면, 예시로, 예로"는 쓸 수 없습니다.';
  }

  if (value.includes('?')) {
    throw 'P 문단에서 "?"문장부호는 쓸 수 없습니다.';
  }

  const but = /(하지만)|(그러나)/gm;
  if (but.test(value)) {
    throw 'P "하지만, 그러나"는 쓸 수 없습니다.';
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (reason.test(value)) {
    throw 'R문 단에서 "왜냐하면, 때문"이라는 단어는 쓸 수 없습니다.';
  }
};

const checkRType = (value: string) => {
  const example = /(예를 들면)|(예시로)|(예로)/gm;
  if (example.test(value)) {
    throw 'R 문단에서 "예를 들면, 예시로, 예로"는 쓸 수 없습니다.';
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (!reason.test(value)) {
    throw 'R문 단에서 "왜냐하면, 때문"이라는 단어는 꼭 필수입니다.';
  }
};

const checkEType = (value: string) => {
  if (value.includes('결론적으로')) {
    throw 'E 문단에서 "결론적으로"는 쓸 수 없습니다.';
  }

  const reason = /(왜냐하면)|(때문)/gm;
  if (reason.test(value)) {
    throw 'E 문단에서 "왜냐하면, 때문"은 쓸 수 없습니다.';
  }
};
