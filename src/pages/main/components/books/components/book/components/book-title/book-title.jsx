import React from 'react';

export const BookTitle = ({ title, inputText }) => {
  const hightLightTitle = (str) => {
    if (!inputText) {
      return str;
    }
    const regexp = new RegExp(inputText, 'ig');
    const matchText = str.match(regexp);

    if (matchText) {
      return str.split(regexp).map((el, index, array) => {
        if (index < array.length - 1) {
          const hightLightLetters = matchText.shift();

          return (
            <React.Fragment>
              {el}
              <span data-test-id='highlight-matches' style={{ color: '#FF5253' }}>
                {hightLightLetters}
              </span>
            </React.Fragment>
          );
        }

        return el;
      });
    }

    return str;
  };

  return <div className='book-title'>{hightLightTitle(title)}</div>;
};
