(function(x) {
  var remUnit = 0.08333;
  console.log(x * remUnit + 'rem');
  return;
})(process.argv.slice(2)[0])
