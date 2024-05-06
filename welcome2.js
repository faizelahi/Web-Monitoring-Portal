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



    // Get the unique key element
    const uniqueKeyElement = document.getElementById('uniqueKey');
    // Get the download button
    const downloadButton = document.getElementById('downloadButton');
    // Get the copy message element
    const copyMessageElement = document.getElementById('copyMessage');

    // Add click event listener to unique key element
    uniqueKeyElement.addEventListener('click', () => {
        // Get the text content of the unique key element
        const uniqueKeyText = uniqueKeyElement.innerText;
        // Create a textarea element
        const textarea = document.createElement('textarea');
        // Set the value of the textarea to the unique key text
        textarea.value = uniqueKeyText;
        // Append the textarea to the body
        document.body.appendChild(textarea);
        // Select the text in the textarea
        textarea.select();
        // Execute the copy command
        document.execCommand('copy');
        // Remove the textarea
        document.body.removeChild(textarea);
        // Show the copy message
        copyMessageElement.innerText = 'Unique key copied to clipboard';
        copyMessageElement.style.display = 'block';
        // Hide the copy message after 3 seconds
        setTimeout(() => {
            copyMessageElement.style.display = 'none';
        }, 3000);
    });