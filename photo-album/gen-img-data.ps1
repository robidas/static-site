# Define the output JSON file name
$outputFile = "images.json"

# Initialize an empty array to store image metadata
$imageList = @()

# Check if the JSON file already exists
if (Test-Path $outputFile) {
    # Read existing JSON file
    $existingJson = Get-Content -Path $outputFile -Raw | ConvertFrom-Json
    
    # Ensure $existingJson is an array (handles cases where only one object exists)
    if ($existingJson -isnot [System.Collections.IEnumerable]) {
        $existingJson = @($existingJson)
    }
    
    # Store existing data in $imageList
    $imageList = $existingJson
}

# Get all .jpg files in the current directory
$images = Get-ChildItem -Path . -Filter "*.jpg"

# Create a hash set of existing file paths for quick lookup
$existingFilePaths = @{}
foreach ($entry in $imageList) {
    $existingFilePaths[$entry.filePath] = $true
}

# Loop through each image file and add only new entries
foreach ($image in $images) {
    if (-not $existingFilePaths.ContainsKey($image.Name)) {
        $imageData = [PSCustomObject]@{
            filePath    = $image.Name  # Store only the file name (relative path)
            title       = "Untitled Image"
            description = "No description available"
        }
        
        # Add the new object to the list
        $imageList += $imageData
    }
}

# Convert the updated array to JSON format
$jsonOutput = $imageList | ConvertTo-Json -Depth 1

# Save JSON to file
$jsonOutput | Set-Content -Path $outputFile -Encoding UTF8

Write-Host "Image metadata successfully updated in $outputFile"
