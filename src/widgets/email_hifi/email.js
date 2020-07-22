function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const getColorCode=(type)=>{
  const codeArray={'ORGANIZATION':'#FF5733',
  'OTHER':'#48C9B0',
  'LOCATION':'#7D3C98',"QUANTITY":'#F1C40F',"DATE":'#21618C',"PERSON":'#8E44AD'
}
  return codeArray[type];
}
export const Emailhifi = email => {
  let emailbody = email.body;
  let emailentities = email.entities;
  if (emailentities && emailentities.length > 0) {
    emailentities.sort(function(a, b) {
      return a.beginOffset - b.beginOffset;
    });
    return applyEntityStyle(emailbody, emailentities);
  } else {
    return emailbody;
  }
};
String.prototype.insertTextAtIndices = function(text) {
  return this.replace(/./g, function(character, index) {
    return text[index] ? text[index] + character : character;
  });
};

const applyEntityStyle = (emailbody, emailentities) => {
  let fullText = '';
  let textbyOffset = '';
  let spantext = {};
  let startIndex = 0;
  let randomcolor = '';

  for (let e of emailentities) {
    textbyOffset = emailbody.substring(startIndex, e['endOffset'] + 1);
    if (
      fullText.indexOf(e.text) === -1 ||
      fullText
        .substring(
          fullText.indexOf(e.text) -
            (fullText.indexOf(e.text) -
              fullText
                .substring(0, fullText.indexOf(e.text))
                .lastIndexOf('span')) -
            1,
          fullText.indexOf(e.text)
        )
        .indexOf('<span') === -1
    ) {
      randomcolor =getColorCode(e.type);
    } else {
      let colorcodespantag = fullText.substring(
        fullText.indexOf(e.text) -
          (fullText.indexOf(e.text) -
            fullText
              .substring(0, fullText.indexOf(e.text))
              .lastIndexOf('span')),
        fullText.indexOf(e.text)
      );
      randomcolor = colorcodespantag.substr(colorcodespantag.indexOf('#'), 7);
    }
    spantext = {
      [e.beginOffset - startIndex]:
        '<span id="' +
        e.id +
        '" style="border-bottom: 2px solid' +
        randomcolor +
        ';" >',
      [e.endOffset - startIndex]: '</span>'
    };
    fullText += textbyOffset.insertTextAtIndices(spantext);
    startIndex = e['endOffset'] + 1;
  }
  if (startIndex !== emailbody.length) {
    textbyOffset = emailbody.substring(startIndex, emailbody.length + 1);
    fullText += textbyOffset;
  }
  return fullText;
};
export default Emailhifi;
