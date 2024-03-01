const postBtn = document.getElementById('post-btn');

let result = 0;

const inputData = {
  operation_number: 1,
  input_array: [
    { command: 'append', number: 23 },

    { command: 'multiply', number: 2 },

    { command: 'power', number: 2 },
  ],
};

function loopInputArray() {
  for (let i in inputData.input_array) {
    switch (inputData.input_array[i].command) {
      case 'append':
        result = result + inputData.input_array[i].number;
        break;

      case 'multiply':
        result = result * inputData.input_array[i].number;
        break;

      case 'power':
        result = result ** inputData.input_array[i].number;
        break;

      case 'reduce':
        result = result - inputData.input_array[i].number;
        break;

      case 'devide':
        result = result / inputData.input_array[i].number;
        break;
    }
  }
  return result;
}

const resultToSend = loopInputArray(inputData.input_array);

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    mode: 'no-cors',
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Accept-Language': 'en-US',
      'Operation-Number': inputData.operation_number,
    },
  }).then((response) => {
    console.log(response);
    return response.text();
  });
};

const create = () => {
  sendHttpRequest(
    'POST',
    'https://dummy.com/api/' + inputData.operation_number + '/result',
    {
      result: resultToSend,
    }
  )
    .then((responseData) => {
      console.log(responseData);
    })
    .then((err) => {
      console.log(err);
    });
};

postBtn.addEventListener('click', create);
