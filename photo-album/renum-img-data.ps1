# PowerShell script to renumber the sortOrder field in images.json based on 
# the physical order of the photo records in the file.

# Load the JSON file
$jsonFilePath = "images.json"
$jsonContent = Get-Content -Path $jsonFilePath -Raw | ConvertFrom-Json

# Initialize the sort order counter
$sortOrder = 1

# Iterate through each image record and update the sortOrder field
foreach ($image in $jsonContent) {
    $image.sortOrder = $sortOrder
    $sortOrder++
}

# Convert the updated content back to JSON format
$updatedJsonContent = $jsonContent | ConvertTo-Json -Depth 10

# Save the updated JSON content back to the file
Set-Content -Path $jsonFilePath -Value $updatedJsonContent

# Output a message indicating the operation is complete
Write-Output "Sort order fields have been updated successfully."