# Load the JSON file
$jsonFilePath = "images.json"
$jsonContent = Get-Content -Path $jsonFilePath -Raw | ConvertFrom-Json

# Sort the JSON content based on the sortOrder field
$sortedJsonContent = $jsonContent | Sort-Object -Property sortOrder

# Convert the sorted content back to JSON format
$updatedJsonContent = $sortedJsonContent | ConvertTo-Json -Depth 10

# Save the sorted JSON content back to the file
Set-Content -Path $jsonFilePath -Value $updatedJsonContent

# Output a message indicating the operation is complete
Write-Output "JSON records have been sorted successfully based on the sortOrder field."