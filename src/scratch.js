// asynchronous function
// asynchronous = multitasking for computers
// asynchronous = returns a promise
async function getFood() {
    // pretend this takes 2 hours
    //return vibrating puck of promise of "foi gra" // pretend
  }
  
  function myDay() {
    console.log("eat breakfast")
    console.log("go to restaurant")
  
    // await is the lever that allows you to pick if you want to wait or not
    // Option 1
    // don't wait, and immediately get the promise of food and move on
    //const promiseOfFood = getFood()
    // Option 2
    // we can wait and get the actual food
    // we use this option if we need the result on the next line
    //const food = await getFood()
  
    // console.log("eating " + food)
    console.log("go to bed")
  }