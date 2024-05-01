   // Get the unique key from the URL query parameter
   const urlParams = new URLSearchParams(window.location.search);
   const key = urlParams.get('key');

   // Display the unique key on the page
   document.getElementById('uniqueKey').innerText = key;

   // Function to download the key as a text file
   function downloadKey() {
       const blob = new Blob([key], { type: 'text/plain' });
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = 'unique_key.txt';
       document.body.appendChild(a);
       a.click();
       window.URL.revokeObjectURL(url);
   }

   // Attach click event listener to the download button
   document.getElementById('downloadButton').addEventListener('click', downloadKey);