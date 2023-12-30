const firebaseConfig = {
    apiKey: "AIzaSyD4BHSZsBErbYOvxKFjKHAsSP_7zmNhN58",
    authDomain: "stay-productive-lvscnr.firebaseapp.com",
    projectId: "stay-productive-lvscnr",
    storageBucket: "stay-productive-lvscnr.appspot.com",
    messagingSenderId: "1005641816972",
    appId: "1:1005641816972:web:d1507643a06babd71954a9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to update flower count in the database
function updateFlowerCount(userId, newCount) {
    return db.collection('users').doc(userId).update({
        flowerCount: newCount
    });
}

// Function to create a bouquet in the database
function createBouquet(userId) {
    return db.collection('bouquets').add({
        userId: userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "flowerCollected") {
        const userId = request.userId;
        const newFlowerCount = request.newFlowerCount;

        if (newFlowerCount % 10 === 0) {
            createBouquet(userId).then(() => {
            updateFlowerCount(userId, 0);
            }).catch(error => {
            console.error("Error creating bouquet:", error);
            });
        } else {
            updateFlowerCount(userId, newFlowerCount).catch(error => {
            console.error("Error updating flower count:", error);
            });
        }
        }
    }
);
