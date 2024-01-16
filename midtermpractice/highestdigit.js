function HighestDigit(digit) {
    if(digit == 0){ 
        return 0;
       }
   else{
     return Math.max(digit%10, HighestDigit(digit/10));
   }
}

console.log(HighestDigit(379));
console.log(HighestDigit(2));
console.log(HighestDigit(377401));