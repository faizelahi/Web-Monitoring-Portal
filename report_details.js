// Get the report key from the query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const reportKey = urlParams.get("report_key");

// Retrieve the report data for the selected report
const reportsRef = db.ref("incident_reports");
reportsRef.child(reportKey).once("value", (snapshot) => {
    const report = snapshot.val();
    // Populate the report details form with the report data
    document.getElementById("reportId").value = report.report_id;
    document.getElementById("date").value = report.date;
    document.getElementById("district").value = report.district;
    document.getElementById("location").value = report.location;
    document.getElementById("policeStation").value = report.police_station;
    document.getElementById("status").value = report.status;
    document.getElementById("title").value = report.title;
    document.getElementById("urgent").value = report.urgent;
    document.getElementById("description").value = report.description;

    // Display current status details
    const statusDetailsContainer = document.getElementById("statusDetails");
    statusDetailsContainer.innerHTML = `Current Status: ${report.status}`;

    // Display progress
    const progress = report.progress || 0; // Default progress is 0 if not defined
    document.getElementById("progress").value = progress;
});

// Update status form submission
document.getElementById("updateStatusForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get selected status
    const status = document.getElementById("statusSelect").value;

    // Update status in the database and log progress activity
    reportsRef.child(reportKey).update({
        status: status
    }).then(() => {
        // Update status details
        const statusDetailsContainer = document.getElementById("statusDetails");
        statusDetailsContainer.innerHTML = `Current Status: ${status}`;
        console.log("Status updated successfully");

        // Store progress activity log
        const timestamp = new Date().toISOString();
        const activityLog = `Updated status to ${status}`;
        reportsRef.child(reportKey).child("progress_activity").child(timestamp).set(activityLog)
            .then(() => {
                console.log("Progress activity logged successfully");
                // Update progress bar
                updateProgressBar();
            }).catch((error) => {
                console.error("Error logging progress activity:", error);
            });
    }).catch((error) => {
        console.error("Error updating status:", error);
    });
});

// Function to update progress bar based on the latest progress
function updateProgressBar() {
    reportsRef.child(reportKey).once("value", (snapshot) => {
        const report = snapshot.val();
        const progress = report.progress || 0;
        document.getElementById("progress").value = progress;
    }).catch((error) => {
        console.error("Error updating progress bar:", error);
    });
}
