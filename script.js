// Get all the student rows
const rows = document.querySelectorAll("tbody tr");

rows.forEach(function(row) {

    // Get all score inputs in this row
    const inputs = row.querySelectorAll(".score");

    // Get Total and Grade cells
    const totalCell = row.querySelector(".total");
    const gradeCell = row.querySelector(".grade");

    // Add restrictions to each input
    inputs.forEach(function(input, index) {

        // CA 1, CA 2 and CA 3 = maximum 10
        // Exam = maximum 70
        const maximum = index < 3 ? 10 : 70;

        // Stop invalid keys from being typed
        input.addEventListener("keydown", function(event) {

            // Allow these keys
            const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab"
            ];

            if (allowedKeys.includes(event.key)) {
                return;
            }

            // Only allow numbers
            if (!/^[0-9]$/.test(event.key)) {
                event.preventDefault();
                return;
            }

            // Check what the value would become
            const newValue = input.value + event.key;

            // Prevent values above the maximum
            if (Number(newValue) > maximum) {
                event.preventDefault();
            }
        });

        // Handle pasted or otherwise changed values
        input.addEventListener("input", function() {

            let value = input.value;

            // Remove non-numbers
            value = value.replace(/[^0-9]/g, "");

            // Enforce maximum
            if (Number(value) > maximum) {
                value = maximum;
            }

            input.value = value;

            calculateScore();
        });
    });

    // Calculate the student's total and grade
    function calculateScore() {

        const ca1 = Number(inputs[0].value);
        const ca2 = Number(inputs[1].value);
        const ca3 = Number(inputs[2].value);
        const exam = Number(inputs[3].value);

        // Calculate total
        const total = ca1 + ca2 + ca3 + exam;

        // Display total
        totalCell.textContent = total;

        // Calculate grade
        if (total >= 70) {
            gradeCell.textContent = "A";
        } else if (total >= 60) {
            gradeCell.textContent = "B";
        } else if (total >= 50) {
            gradeCell.textContent = "C";
        } else if (total >= 45) {
            gradeCell.textContent = "D";
        } else if (total >= 40) {
            gradeCell.textContent = "E";
        } else {
            gradeCell.textContent = "F";
        }
    }
});

