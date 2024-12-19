// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDfa7BdS2Mvqqh1oufYt6MMVcHkGQt_vGY",
  authDomain: "indiazfashion.firebaseapp.com",
  projectId: "indiazfashion",
  storageBucket: "indiazfashion.appspot.com",
  messagingSenderId: "830809729124",
  appId: "1:830809729124:web:2b46b64154d3a968e19771",
  measurementId: "G-MKVN46YLD9"
};

firebase.initializeApp(firebaseConfig);
const fs = firebase.firestore();
const aut = firebase.auth();
const stor = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('sub').addEventListener('click', function() {
    console.log('Button clicked');
    var downloadlink;
    var id=document.getElementById('iden').value;
    const fi = document.getElementById('file');
    const fule = fi.files[0];


    function upload(fule) {
      if (fule) {
        console.log('File:', fule.name);

        const storageref = stor.ref('pro/' + fule.name);
        const metadata = {
          contentType: 'image/jpeg'
        };

        // Start the file upload
        const uptask = storageref.put(fule, metadata);

        // Listen for state changes, errors, and completion
        uptask.on('state_changed', (snap) => {
          // Progress updates
          const prog = (snap.bytesTransferred / snap.totalBytes) * 100;
          const sr = document.createElement('div');
          sr.innerHTML = prog + '% uploaded';
          document.body.appendChild(sr);
        }, (error) => {
          // Handle upload errors
          alert('Upload error: ' + error.message);
        }, () => {
          // Upload completed successfully, get download URL
         uptask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);;
            downloadlink=downloadURL;
          }).catch((error) => {
            console.error('Error getting download URL:', error);
          });
        });
      }
    }

    function db(downloadlink,id) {
      console.log('Saving to Firestore:', id);
      const data={
        titl:document.getElementById('titl').value,pr:"Rs."+document.getElementById('pr').value,link:downloadlink
      }
      fs.collection('pro').doc(id).set(data).then(() => {
        alert('Data saved');
      }).catch((error) => {
        console.log('Error saving data:', error);
      });
    }

    upload(fule);
    setTimeout(function (){
    db(downloadlink,id);
    },5000)
  });
});