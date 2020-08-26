// IPv4 CIDR to IP Range Converter
// Kameron Balutch
// August 23, 2020

class CIDR
/*
  Assumes that the CIDR is passed in the correct format
  [0-255].[0-255].[0-255].[0-255]/[0-32]
*/
{
  constructor(address)
  {
    this.address = address;
    this.cidr_num = parseInt(address.split("/").pop());
    this.octets = address.split("/")[0].split(".").map(function (x)
      {return parseInt(x, 10);});
  }

  get mask()
  // Given the number of fixed bits, generates the corresponding mask 
  {
    var mask_str = '';

    for (let i = 0; i < this.cidr_num; i++)
    {
      mask_str = mask_str.concat('1');
    }

    mask_str = mask_str.padEnd(32, '0');

    return mask_str.match(/.{1,8}/g).map(function (x)
      {return parseInt(x, 2);}).join('.');
  }

  get numberOfAddresses()
  // Includes the fixed network address and broadcast address
  {
    return Math.pow(2, 32-this.cidr_num);
  }

  toString()
  {
    return this.address;
  }
}

var cidr_str = process.argv.slice(2).toString();
var re = new RegExp(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);

try
{
  if (!re.test(cidr_str)) throw "Invalid CIDR";
}
catch (err)
{
  console.log("Error: " + err);
  process.exit(1);
}

var cidr = new CIDR(cidr_str);
console.log(cidr.mask);
console.log(cidr.numberOfAddresses);

// Tested object type
// console.log(Object.prototype.toString.call(cidr));

//cidr = cidr.replace(/[^0-9a-zA-Z]/g, ' ');
//console.log(cidr);
