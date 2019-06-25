function day() {
    var d = new Date();
    var n = d.getDay();
    
    var month = d.getMonth();
    if (month === 0){
    document.getElementById("month").innerHTML = "January";    
    }
    else if (month === 1){
    document.getElementById("month").innerHTML = "Febuary";    
    }
        else if (month === 2){
        document.getElementById("month").innerHTML = "March";    
        }
            else if (month === 3){
            document.getElementById("month").innerHTML = "April";    
            }
                else if (month === 4){
                document.getElementById("month").innerHTML = "May";    
                }
                    else if (month === 5){
                    document.getElementById("month").innerHTML = "June";    
                    }
                        else if (month === 6){
                        document.getElementById("month").innerHTML = "July";    
                        }
                            else if (month === 7){
                            document.getElementById("month").innerHTML = "August";    
                            }
                                else if (month === 8){
                                document.getElementById("month").innerHTML = "September";    
                                }
                                    else if (month === 9){
                                    document.getElementById("month").innerHTML = "October";    
                                    }
                                        else if (month === 10){
                                        document.getElementById("month").innerHTML = "November";    
                                        }
                                            else if (month === 11){
                                            document.getElementById("month").innerHTML = "December";    
                                            }
    
    var num = d.getDate();
    if (n === 0){ 
    document.getElementById("Sunday").innerHTML = "Sunday "+ num;
    document.getElementById("Monday").innerHTML = "Monday "+ (num+1);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num+2);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num+3);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num+4);
    document.getElementById("Friday").innerHTML = "Friday "+ (num+5);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+6);
    }
    else if (n === 1){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-1);
    document.getElementById("Monday").innerHTML = "Monday "+ num;
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num+1);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num+2);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num+3);
    document.getElementById("Friday").innerHTML = "Friday "+ (num+4);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+5);
    }
    else if (n === 2){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-2);
    document.getElementById("Monday").innerHTML = "Monday "+ (num-1);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ num;
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num+1);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num+2);
    document.getElementById("Friday").innerHTML = "Friday "+ (num+3);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+4);
    }
    else if (n === 3){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-3);
    document.getElementById("Monday").innerHTML = "Monday "+ (num-2);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num-1);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num+1);
    document.getElementById("Friday").innerHTML = "Friday "+ (num+2);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+3);
    }
    else if (n === 4){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-4);
    document.getElementById("Monday").innerHTML = "Monday "+ (num-3);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num-2);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num-1);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num);
    document.getElementById("Friday").innerHTML = "Friday "+ (num+1);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+2);
    }
    else if (n === 5){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-5);
    document.getElementById("Monday").innerHTML = "Monday "+ (num-4);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num-3);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num-2);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num-1);
    document.getElementById("Friday").innerHTML = "Friday "+ (num);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num+1);
    }
    else if (n === 6){
    document.getElementById("Sunday").innerHTML = "Sunday "+ (num-6);
    document.getElementById("Monday").innerHTML = "Monday "+ (num-5);
    document.getElementById("Tuesday").innerHTML = "Tuesday "+ (num-4);
    document.getElementById("Wednesday").innerHTML = "Wednesday "+ (num-3);
    document.getElementById("Thursday").innerHTML = "Thursday "+ (num-2);
    document.getElementById("Friday").innerHTML = "Friday "+ (num-1);
    document.getElementById("Saturday").innerHTML = "Saturday "+ (num);
    }
  }
