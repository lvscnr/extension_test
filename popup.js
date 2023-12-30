document.addEventListener('DOMContentLoaded', function() {
    const flower = document.getElementById('flower');
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    let userTimer = 0;
    let flowerCount = 0;
    let flowerType = 0; //placeholder for flower type 1-5
    let intervalId;

    startBtn.addEventListener('click', startTimer);

    function startTimer(){
        //clear any existing timer interval
        clearInterval(intervalId);

        //reset flower count if a new timer is started
        flowerCount=0;

        //get user input for the timer in minute
        userTimer = prompt("Enter timer duration between 15 and 120 minutes");

        //Validate user input
        if(userTimer>= 15 && userTimer <= 120) {
            //randomly select a flower type (1 to 5)
            flowerType = Math.floor(Math.random()* 5) + 1;
            
            //calculate flower growth rate
            const flowerGrowthRate = userTimer/4;

            //initialize timer and flower growth
            let currentTime = 0;
            updateFlowerImage(currentTime);

            intervalId = setInterval(function(){
                currentTime++;
                timerDisplay.textContent = `Time: ${currentTime} min`;

                if(currentTime % flowerGrowthRate === 0){
                    flowerCount++;
                    updateFlowerImage(currentTime);
                }

                if(currentTime === userTimer){
                    clearInterval(intervalId);
                    alert('Timer Completed!');

                    chrome.runtime.sendMessage({
                        message: 'flowerCollected',
                        userId:dynamicallyObtainedUserId,
                        newflowerCount: flowerCount
                    });
                }
            }, 6000 );
        } else {
            alert('Please enter a value between 15 and 120 minutes');
        }
    }

    function updateFlowerImage(currentTime){
        let phase = Math.ceil(currentTime/(userTimer/4));

        flower.style.backgroundImage = `url("images/flower${flowerType}_phase${phase}.png")`;
    }
}) 

// // popup.js

// document.addEventListener('DOMContentLoaded', function () {
//     const flower = document.getElementById('flower');
//     const timerDisplay = document.getElementById('timer');
//     let userTimer = 0;
//     let flowerType = 0; // Placeholder for the flower type (1 to 5)
//     let flowerCount = 0;
//     let intervalId;

// // Start the timer immediately when the extension icon is clicked
// startTimer();

// function startTimer() {
//     // Reset flower count if a new timer is started
//     flowerCount = 0;

//     // Set the timer duration (you can replace this with your logic to get the user's preferred duration)
//     userTimer = 60; // Example: 60 minutes

//     // Randomly select a flower type (1 to 5)
//     flowerType = Math.floor(Math.random() * 5) + 1;

//     // Calculate flower growth rate (userinputtimer/4)
//     const flowerGrowthRate = userTimer / 4;

//     // Initialize timer and flower growth
//     let currentTime = 0;
//     updateFlowerImage(currentTime);

//     // Start the timer interval
//     intervalId = setInterval(function () {
//     currentTime++;

//     // Update timer display
//     timerDisplay.textContent = `Time: ${currentTime} min`;

//     // Update flower growth based on the growth rate
//     if (currentTime % flowerGrowthRate === 0) {
//         flowerCount++;
//         updateFlowerImage(currentTime);
//     }

//     // Check if the timer is complete
//     if (currentTime === userTimer) {
//         clearInterval(intervalId);
//         alert("Timer completed!");

//         // Notify background script about the collected flower
//         chrome.runtime.sendMessage({
//         message: "flowerCollected",
//         userId: "123", // Replace with the actual user ID
//         newFlowerCount: flowerCount
//         });
//     }
//     }, 60000); // Update every 1 minute (60,000 milliseconds)
// }

// function updateFlowerImage(currentTime) {
//     // Determine the phase based on currentTime
//     let phase = Math.ceil(currentTime / (userTimer / 4));
    
//     // Use phase and flowerType to set the background image for the flower
//     flower.style.backgroundImage = `url("images/flower${flowerType}_phase${phase}.jpg")`;
// }
// });

