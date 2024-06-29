        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAZeZP_JsHuMuJLd2AlMzomUkejSyhnBfM",
            authDomain: "crime-app-2.firebaseapp.com",
            databaseURL: "https://crime-app-2-default-rtdb.firebaseio.com",
            projectId: "crime-app-2",
            storageBucket: "crime-app-2.appspot.com",
            messagingSenderId: "734810485452",
            appId: "1:734810485452:web:0c4cc229c4d6a39445c869",
            measurementId: "G-5TQGFNXH4S"
          };
          
                firebase.initializeApp(firebaseConfig);
        
                // Reference to the Firebase Realtime Database
                const db = firebase.database();
        
                function fetchAllReports() {
                  const reportsRef = db.ref("incidents/user_complaints");
                  reportsRef.once("value", (snapshot) => {
                      const reports = snapshot.val();
                      displayReports(reports);
                  })
                  .catch((error) => {
                      console.error("Error fetching reports:", error);
                  });
              }
              
        
                // Function to display reports in the table
                function displayReports(reports) {
                    const reportTable = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
                    reportTable.innerHTML = ""; // Clear existing table rows
                    for (const key in reports) {
                        if (Object.hasOwnProperty.call(reports, key)) {
                            const report = reports[key];
                            const row = reportTable.insertRow();
                            row.innerHTML = `
                               
                                <td>${report.date}</td>
                                <td>${report.district}</td>
                                <td>${report.location}</td>
                                <td>${report.police_station}</td>
                                <td>${report.status}</td>
                                <td>${report.title}</td>
                                <td>${report.urgent}</td>
                                <td><button onclick="viewReportDetails('${key}', ${JSON.stringify(report)})">View</button></td>
                            `;
                        }
                    }
                }
        
                // Function to view report details
                function viewReportDetails(key, report) {
                    // Redirect to another page or show details in a modal
                    console.log("Report ID:", key);
                    console.log("Report Details:", report);
                    // Example: Redirect to another page with query parameter
                    window.location.href = `report_details.html?report_key=${key}`;
                }
        
                // Fetch and display reports on page load
                fetchAllReports();
                // Function to view report details
function viewReportDetails(key) {
    // Redirect to the report details page with the report key as a query parameter
    window.location.href = `report_details.html?report_key=${encodeURIComponent(key)}`;
}
// Get the report table body
const reportTableBody = document.querySelector("#reportTable tbody");

// Add a click event listener to each report row
reportTableBody.addEventListener("click", (event) => {
  // Check if the clicked element is a report row
  if (event.target.tagName === "TR") {
    // Extract the report ID from the row's data-report-id attribute
    const reportId = event.target.dataset.reportId;
    // Redirect to the report details page with the report ID as a query parameter
    window.location.href = `report_details.html?report_id=${reportId}`;
  }
});
function displayReports(reports) {
    const reportTable = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
    reportTable.innerHTML = ""; // Clear existing table rows
    for (const key in reports) {
      if (Object.hasOwnProperty.call(reports, key)) {
        const report = reports[key];
        const row = reportTable.insertRow();
        row.dataset.reportId = key; // Add data-report-id attribute
        row.innerHTML = `
          <td>${key}</td>
          <td>${report.date}</td>
          <td>${report.district}</td>
          <td>${report.location}</td>
          <td>${report.police_station}</td>
          <td>${report.status}</td>
          <td>${report.title}</td>
          <td>${report.urgent}</td>
          <td><button onclick="viewReportDetails('${key}')">View</button></td>
        `;
      }
    }
  }

