function DecimalToHex(decimal = 0) {
    let prefix = decimal <= 15 ? "0" : "";
    return prefix + decimal.toString(16);
}

function HexToDecimal(hex = "0") {
    switch(hex) {
      case "a" : hex = "10"; break;
      case "b" : hex = "11"; break;
      case "c" : hex = "12"; break;
      case "d" : hex = "13"; break;
      case "e" : hex = "14"; break;
      case "f" : hex = "15"; break;
      default: break;
    }
    return hex;
  }

function GetHex(red = 0, green = 0, blue = 0) {
    red = red < 0 ? 0 : red;
    red = red > 255 ? 255 : red;
    green = green < 0 ? 0 : green;
    green = green > 255 ? 255 : green;
    blue = blue < 0 ? 0 : blue;
    blue = blue > 255 ? 255 : blue;
    let result = "#";
    result += DecimalToHex(red);
    result += DecimalToHex(green);
    result += DecimalToHex(blue);
    return result;
}

function GetRedFromHex(hex = "#000000") {
    let leftNumber = ~~HexToDecimal(hex[1]);
    let rightNumber = ~~HexToDecimal(hex[2]);
    let result = leftNumber * 16 + rightNumber;
    return result;
}

function GetGreenFromHex(hex = "#000000") {
    let leftNumber = ~~HexToDecimal(hex[3]);
    let rightNumber = ~~HexToDecimal(hex[4]);
    let result = leftNumber * 16 + rightNumber;
    return result;
}

function GetBlueFromHex(hex = "#000000") {
    let leftNumber = ~~HexToDecimal(hex[5]);
    let rightNumber = ~~HexToDecimal(hex[6]);
    let result = leftNumber * 16 + rightNumber;
    return result;
}

function HexToRGB(hex = "#000000") {
    let result = [];
    result.push(GetRedFromHex(hex));
    result.push(GetGreenFromHex(hex));
    result.push(GetBlueFromHex(hex));
    return result;
}