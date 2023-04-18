/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

import axios from "axios";

export const sendMessage = async (data) => {
  var config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    await axios(config)
    return `it works fine ${process.env.VERSION} ${data}`;
  } catch (error) {
    return error;
  }
}

export const getTextMessageInput = (recipient) => {
  return JSON.stringify(
    {
      "messaging_product": "whatsapp",
      "to": recipient,
      "type": "template",
      "template": {
          "name": "hello_world",
          "language": {
              "code": "en_US"
          }
      }
  }
  );
}

export const getTemplatedMessageInput= (recipient, movie, seats) => {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": "sample_movie_ticket_confirmation",
      "language": {
        "code": "en_US"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "image",
              "image": {
                "link": movie
              }
            }
          ]
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": movie
            },
            {
              "type": "date_time",
              "date_time": {
                "fallback_value": movie
              }
            },
            {
              "type": "text",
              "text": movie
            },
            {
              "type": "text",
              "text": seats
            }
          ]
        }
      ]
    }
  }
  );
}


export const sendCamp =async (datas) => {
  for (let index = 0; index < 2; index++) {
    const element = datas[index]['opt_out'];
    if(element){
      const data = getTextMessageInput(datas[index]['phone_number']);
    
      try {
          const respo =await sendMessage(data);
          return "respo";
          
      } catch (error) {
          return 'errorr';
      }
    }
  }
  return "success";
}