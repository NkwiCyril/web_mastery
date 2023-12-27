function message(bmi, message) {
  return "Your BMI is " + bmi + ", so you " + message;
}

function bmiCalculator(weight, height) {
  var bmi = weight / (height * height);
  bmi = bmi.toFixed(2)
  var interpretation;

  if (bmi < 18.5) {
    interpretation = message(bmi, "are underweight.");
  }
  if (bmi > 18.5 && bmi < 24.9) {
    interpretation = message(bmi, "have a normal weight.");
  }
  if (bmi > 24.9 && bmi < 29.9) {
    interpretation = message(bmi, "are overweight.");
  }
  if (bmi > 30 && bmi < 34.9) {
    interpretation = message(bmi, "are obese");
  }
  if (bmi > 35) {
    interpretation = message(bmi, "are extremely obese.");
  }
  return interpretation;
}

console.log(bmiCalculator(500,74));
