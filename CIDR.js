// IPv4 CIDR to IP Range Converter
// kbalutch@uci.edu
// August 23, 2020
// Last Updated Aug 29, 2020

class CIDR
/*
  Expects 'address' of type string in format:
  [0-255].[0-255].[0-255].[0-255]/[0-32]
*/
{
  constructor(address)
  {
    var re = new RegExp(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);

    try
    {
      if (!re.test(address)) throw "Invalid CIDR";
    }
    catch (err)
    {
      console.log("Error: " + err);
      process.exit(1);
    }

    this.address = address;
    this.mask_bits = parseInt(address.split("/").pop());
    this.octets = address.split("/")[0].split(".").map(function (x)
      {return parseInt(x, 10);});
  }

  get mask()
  // Given the number of masked bits, generates the corresponding mask
  {
    var mask_str = '';

    for (let i = 0; i < this.mask_bits; i++)
    {
      mask_str = mask_str.concat('1');
    }

    mask_str = mask_str.padEnd(32, '0');

    return mask_str.match(/.{1,8}/g).map(function (x)
      {return parseInt(x, 2);});
  }

  get numberOfAddresses()
  // Includes the fixed network address and broadcast address
  {
    return Math.pow(2, 32-this.mask_bits);
  }

  get lowerRange()
  {
    return this.octets.map((x, index) =>
      {return x & this.mask[index];});
  }

  get wildCardBits()
  {
    return this.octets.map((x,index) =>
      {return 255 - this.mask[index];});
  }

  get upperRange()
  {
    return this.lowerRange.map((x,index) =>
      {return x + this.wildCardBits[index];});
  }

  get range()
  // Return the range of IP addresses defined by the CIDR address
  {
    return [this.lowerRange.join("."), this.upperRange.join(".")];
  }

  toString()
  {
    return this.address;
  }
}

module.exports = CIDR;

/*
var cidr_str = process.argv.slice(2).toString();
var cidr = new CIDR(cidr_str);
console.log("Mask: ", cidr.mask);
console.log("Addresses: ", cidr.numberOfAddresses);
console.log("Range: ", cidr.range);
*/
