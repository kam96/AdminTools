// CIDR to IP Range Converter
// Kameron Balutch
// August 23, 2020

var cidr = process.argv.slice(2);
var re = new RegExp(
  /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);

try
{
  if (!re.test(cidr)) throw "Invalid CIDR";
}
catch (err)
{
  console.log("Error: " + err);
  return -1;
}
